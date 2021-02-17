const router = require('express').Router();

const SubjectController = require('../Controllers/SubjectController');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../Enterprise_business_rules/Manage_error/codeError');
const errorToStatus = require('../../Frameworks_drivers/errorToStatus');

/* Create Subject */
router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;

    // Se comprueba si nombre de la asignatura no ha sido introducido
    if (!name) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'El nombre es necesario', 'incomplete_data');
    }

    const subject = await SubjectController.createSubject(name);
    res.json(subject);
  } catch (err) {
    next(err);
  }
});

/* List Subjects */
router.get('/', async (req, res, next) => {
  try {
    const subjects = await SubjectController.listSubjects();
    res.json(subjects);
  } catch (err) {
    next(err);
  }
});

/* Get Subject */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Es necesario seleccionar un aula o laboratorio', 'incomplete_data');
    }

    // Comprobamos que el ID es un número
    if (Number.isNaN(Number(req.params.id))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }

    const subject = await SubjectController.getSubject(id);
    res.json(subject);
  } catch (err) {
    next(err);
  }
});

/* Delete Subject */
router.delete('/:id', async (req, res, next) => {
  try {
    // Comprobamos que el ID es un número
    if (Number.isNaN(Number(req.params.id))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }

    await SubjectController.deleteSubject(req.params.id);
    res.json({ state: 'OK' });
  } catch (err) {
    next(err);
  }
});

/* Modify Subject */
router.patch('/:id', async (req, res, next) => {
  const subjectData = {
    id: req.params.id,
    ...req.body,
  };
  try {
    // Se comprueba que el id que se recibe es un entero
    if (Number.isNaN(Number(req.params.id))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }

    // Se comprueba que al menos exista un dato para ser actualizado
    const { name } = req.body;
    if (!name) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Es necesario el nombre para actualizar', 'incomplete_data');
    }

    await SubjectController.updateSubject({ subjectData });
    res.json({ state: 'OK' });
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  const status = errorToStatus(err);
  res.status(status).json(err);
});
module.exports = router;
