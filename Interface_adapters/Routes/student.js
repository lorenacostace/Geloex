const router = require('express').Router();

const studentController = require('../Controllers/StudentController');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../Enterprise_business_rules/Manage_error/codeError');
const errorToStatus = require('../../Frameworks_drivers/errorToStatus');

/* Create Student */
router.post('/', async (req, res, next) => {
  try {
    const { name, fSurname, sSurname, email, idAdmin } = req.body;
    // Se comprueba si algún dato requerido no ha sido introducido
    if (!name || !fSurname || !sSurname || !email || !idAdmin) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Los parámetros introducidos son incorrectos o están incompletos', 'incomplete_data');
    }

    const student = await studentController.createStudent({ studentData: req.body });
    res.json(student);
  } catch (err) {
    next(err);
  }
});

/* Get Student */
router.get('/:idAdmin', async (req, res, next) => {
  try {
    // Comprobamos que se reciben el idAdmin y el idUser
    if (!req.params.idAdmin || !req.body.idUser) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los ids deben ser números', 'incomplete_data');
    }

    // Comprobamos que los ids recibidos son números
    if (Number.isNaN(Number(req.params.idAdmin)) || Number.isNaN(Number(req.body.idUser))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }

    const student = await studentController.getStudent({ usersData: { idAdmin: req.params.idAdmin, idUser: req.body.idUser } });
    res.json(student);
  } catch (err) {
    next(err);
  }
});

/* List AdminExam */
router.get('/', async (req, res, next) => {
  try {
    // Comprobamos que se reciben el idAdmin y el idUser
    if (!req.body.idAdmin) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID es necesario para listar los usuarios', 'incomplete_data');
    }

    // Comprobamos que los ids recibidos son números
    if (Number.isNaN(Number(req.body.idAdmin))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }

    const student = await studentController.listStudent(req.body.idAdmin);
    res.json(student);
  } catch (err) {
    next(err);
  }
});

/* Delete Student */
router.delete('/:idAdmin', async (req, res, next) => {
  try {
    // Se comprueba que se han recibido idAdmin e idUser
    if (!req.params.idAdmin || !req.body.idUser) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El identificador del administrador y el del usuario son necesarios', 'incomplete_data');
    }

    // Se comprueba que idAdmin y idUser sean números
    if (Number.isNaN(Number(req.params.idAdmin)) || Number.isNaN(Number(req.body.idUser))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los ids deben ser números', 'id_format_error');
    }

    await studentController.deleteStudent({ usersData: { idAdmin: req.params.idAdmin, idUser: req.body.idUser } });
    res.json({ state: 'OK' });
  } catch (err) {
    next(err);
  }
});

/* Modify AdminExam */
router.patch('/:idAdmin', async (req, res, next) => {
  try {
    // Se comprueba que se ha recibido el idAdmin y el del usuario
    if (!req.params.idAdmin || !req.body.idUser) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs son necesarios para actualizar el estudiante', 'id_empty');
    }

    // Se comrprueba que los IDs sean números
    if (Number.isNaN(Number(req.params.idAdmin)) || Number.isNaN(Number(req.body.idUser))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs deben ser números', 'id_format_error');
    }
    // Se comprueba que al menos exista un dato para ser actualizado
    const { name, fSurname, sSurname, email } = req.body;
    if (!name && !fSurname && !sSurname && !email) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Es necesario al menos un parámetro para actualizar', 'incomplete_data');
    }

    const usersData = {
      idAdmin: req.params.idAdmin,
      ...req.body,
    };

    await studentController.updateStudent({ usersData });
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
