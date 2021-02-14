const router = require('express').Router();

const TeacherController = require('../Controllers/TeacherController');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../Enterprise_business_rules/Manage_error/codeError');
const errorToStatus = require('../../Frameworks_drivers/errorToStatus');

/* List Teachers */
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

    const teachers = await TeacherController.listTeachers(req.body.id);
    res.json(teachers);
  } catch (err) {
    next(err);
  }
});

/* Get Teacher */
router.get('/:id', async (req, res, next) => {
  try {
    // Comprobamos que se reciben el idAdmin y el idUser
    if (!req.params.id || !req.body.id) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los ids deben ser números', 'incomplete_data');
    }

    // Comprobamos que los ids recibidos son números
    if (Number.isNaN(Number(req.params.id)) || Number.isNaN(Number(req.body.id))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }

    const teacher = await TeacherController.getTeacher({ usersData: { idAdmin: req.params.id, idUser: req.body.id } });
    res.json(teacher);
  } catch (err) {
    next(err);
  }
});

/* Create Teacher */
router.post('/:id', async (req, res, next) => {
  try {
    const { name, fSurname, sSurname, email } = req.body;
    // Se comprueba si algún dato requerido no ha sido introducido
    if (!name || !fSurname || !sSurname || !email || !req.params.id) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Los parámetros introducidos no son incorrectos o están incompletos', 'incomplete_data');
    }
    const teacher = await TeacherController.createTeacher({ teacherData: { idAdmin: req.params.id, name, fSurname, sSurname, email } });
    res.json(teacher);
  } catch (err) {
    next(err);
  }
});

/* Modify Teacher */
router.put('/:id', async (req, res, next) => {
  try {
    // Se comprueba que se ha recibido el idAdmin y el del usuario
    if (!req.params.id || !req.body.id) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs son necesarios para actualizar el profesor', 'id_empty');
    }

    // Se comrprueba que los IDs sean números
    if (Number.isNaN(Number(req.params.id)) || Number.isNaN(Number(req.body.id))) {
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

    await TeacherController.updateTeacher({ usersData });
    res.json({ state: 'OK' });
  } catch (err) {
    next(err);
  }
});

/* Delete Teacher */
router.delete('/:id', async (req, res, next) => {
  try {
    // Comprobamos que se reciben el idAdmin y el idUser
    if (!req.params.id || !req.body.id) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'incomplete_data');
    }

    // Comprobamos que los ids recibidos son números
    if (Number.isNaN(Number(req.params.id)) || Number.isNaN(Number(req.body.id))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }

    await TeacherController.deleteTeacher({ usersData: { idAdmin: req.params.id, idUser: req.body.id } });
    res.json({ state: 'OK' });
  } catch (err) {
    next(err);
  }
});


// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  const status = errorToStatus(err);
  res.status(status).json(err.toJSON());
});
module.exports = router;
