const router = require('express').Router();

const AdminExamController = require('../Controllers/AdminExamController');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../Enterprise_business_rules/Manage_error/codeError');
const errorToStatus = require('../../Frameworks_drivers/errorToStatus');

/* Create AdminSystem */
router.post('/', async (req, res, next) => {
  try {
    const { name, fSurname, sSurname, email, idAdmin } = req.body;
    // Se comprueba si algún dato requerido no ha sido introducido
    if (!name || !fSurname || !sSurname || !email || !idAdmin) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Los parámetros introducidos son incorrectos o están incompletos', 'incomplete_data');
    }

    const adminExam = await AdminExamController.createAdminExam({ adminExamData: req.body });
    res.json(adminExam);
  } catch (err) {
    next(err);
  }
});

/* Get AdminExam */
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

    const adminExam = await AdminExamController.getAdminExam({ usersData: { idAdmin: req.params.id, idUser: req.body.idUser } });
    res.json(adminExam);
  } catch (err) {
    next(err);
  }
});

/* List AdminExam */
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

    const adminExam = await AdminExamController.listAdminExam(req.body.id);
    res.json(adminExam);
  } catch (err) {
    next(err);
  }
});

/* Delete AdminExam */
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

    await AdminExamController.deleteAdminExam({ usersData: { idAdmin: req.params.id, idUser: req.body.idUser } });
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
