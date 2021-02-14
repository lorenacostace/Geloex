const router = require('express').Router();

const AdminSystemController = require('../Controllers/AdminSystemController');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../Enterprise_business_rules/Manage_error/codeError');
const errorToStatus = require('../../Frameworks_drivers/errorToStatus');

/* Create AdminSystem */
router.post('/', async (req, res, next) => {
  try {
    const { name, fSurname, sSurname, email } = req.body;
    // Se comprueba si algún dato requerido no ha sido introducido
    if (!name || !fSurname || !sSurname || !email) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Los parámetros introducidos son incorrectos o están incompletos', 'incomplete_data');
    }

    const adminSystem = await AdminSystemController.createAdminSystem({ adminSystemData: req.body });
    res.json(adminSystem);
  } catch (err) {
    next(err);
  }
});

/* Get AdminSystem */
router.get('/:id', async (req, res, next) => {
  try {
    // Comprobamos que se reciben el idAdmin y el idUser
    if (!req.params.id || !req.body.idUser) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los ids deben ser números', 'incomplete_data');
    }

    // Comprobamos que los ids recibidos son números
    if (Number.isNaN(Number(req.params.id)) || Number.isNaN(Number(req.body.idUser))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }

    const adminSystem = await AdminSystemController.getAdminSystem({ usersData: { idAdmin: req.params.id, idUser: req.body.idUser } });
    res.json(adminSystem);
  } catch (err) {
    next(err);
  }
});

/* Delete AdminSystem */
router.delete('/:id', async (req, res, next) => {
  try {
    // Se comprueba que se han recibido idAdmin e idUser
    if (!req.params.id || !req.body.idUser) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El identificador del administrador y el del usuario son necesarios', 'incomplete_data');
    }

    // Se comprueba que idAdmin y idUser sean números
    if (Number.isNaN(Number(req.params.id)) || Number.isNaN(Number(req.body.idUser))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los ids deben ser números', 'id_format_error');
    }

    await AdminSystemController.deleteAdminSystem({ usersData: { idAdmin: req.params.id, idUser: req.body.idUser } });
    res.json({ state: 'OK' });
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  const status = errorToStatus(err);
  res.status(status).json(err.toJSON());
});

module.exports = router;
