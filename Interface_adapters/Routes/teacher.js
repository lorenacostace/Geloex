const router = require('express').Router();

const TeacherController = require('../Controllers/TeacherController');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../Enterprise_business_rules/Manage_error/codeError');
const errorToStatus = require('../../Frameworks_drivers/errorToStatus');

/* List Teachers */
router.get('/', async (req, res, next) => {
  try {
    const teachers = await TeacherController.listTeachers();
    res.json(teachers);
  } catch (err) {
    next(err);
  }
});

/* Get Teacher */
router.get('/:id', async (req, res, next) => {
  try {
    if (Number.isNaN(Number(req.params.id))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }
    const teacher = await TeacherController.getTeacher(req.params.id);
    res.json(teacher);
  } catch (err) {
    next(err);
  }
});

/* Create Teacher */
router.post('/', async (req, res, next) => {
  try {
    const { name, fSurname, sSurname, email } = req.body;
    // Se comprueba si algún dato requerido no ha sido introducido
    if (!name || !fSurname || !sSurname || !email) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Los parámetros introducidos son incorrectos o están incompletos', 'incomplete_data');
    }
    const teacher = await TeacherController.createTeacher({ teacherData: req.body });
    res.json(teacher);
  } catch (err) {
    next(err);
  }
});

/* Modify Teacher */
router.put('/:id', async (req, res, next) => {
  const teacherData = {
    id: req.params.id,
    ...req.body,
  };
  try {
    if (Number.isNaN(Number(req.params.id))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }
    // Comprobamos que al menos exista un data para ser actualizado
    const { name, fSurname, sSurname, email, role } = req.body;
    if (!name && !fSurname && !sSurname && !email && !role) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Es necesario al menos un parámetro para actualizar', 'incomplete_data');
    }
    await TeacherController.updateTeacher({ teacherData });
    res.json({ state: 'OK' });
  } catch (err) {
    next(err);
  }
});

/* Delete Teacher */
router.delete('/:id', async (req, res, next) => {
  try {
    // Comprobamos que el ID es un número
    if (!req.params.id || Number.isNaN(Number(req.params.id))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }
    await TeacherController.deleteTeacher(req.params.id);
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
