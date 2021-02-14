const router = require('express').Router();

const AdminSystemController = require('../Controllers/AdminSystemController');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../Enterprise_business_rules/Manage_error/codeError');
const errorToStatus = require('../../Frameworks_drivers/errorToStatus');

/* Create AdminSystem */
router.post('/', async (req, res, next) => {
  try {
    const { name, fSurname, sSurname, email, idAdmin } = req.body;
    // Se comprueba si algún dato requerido no ha sido introducido
    if (!name || !fSurname || !sSurname || !email || idAdmin) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Los parámetros introducidos son incorrectos o están incompletos', 'incomplete_data');
    }

    const adminSystem = await AdminSystemController.createAdminSystem({ adminSystemData: req.body });
    res.json(adminSystem);
  } catch (err) {
    next(err);
  }
});

/* List Admin System */
router.get('/', async (req, res, next) => {
  try {
    // Comprobamos que se reciben el idAdmin y el idUser
    if (!req.body.id) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID es necesario para listar los usuarios', 'incomplete_data');
    }

    // Comprobamos que los ids recibidos son números
    if (Number.isNaN(Number(req.body.id))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }

    const adminSystem = await AdminSystemController.listAdminSystem(req.body.id);
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

/* Modify AdminSystem */
router.patch('/:id', async (req, res, next) => {
  try {
    // Se comprueba que se ha recibido el idAdmin y el del usuario
    if (!req.params.id || !req.body.idUser) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs son necesarios para actualizar el profesor', 'id_empty');
    }

    // Se comrprueba que los IDs sean números
    if (Number.isNaN(Number(req.params.id)) || Number.isNaN(Number(req.body.idUser))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs deben ser números', 'id_format_error');
    }
    // Se comprueba que al menos exista un dato para ser actualizado
    const { name, fSurname, sSurname, email } = req.body;
    if (!name && !fSurname && !sSurname && !email) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Es necesario al menos un parámetro para actualizar', 'incomplete_data');
    }

    const usersData = {
      idAdmin: req.params.id,
      ...req.body,
    };

    await AdminSystemController.updateAdminSystem({ usersData });
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
