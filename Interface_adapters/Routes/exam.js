const router = require('express').Router();

const ExamController = require('../Controllers/ExamController');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../Enterprise_business_rules/Manage_error/codeError');
const errorToStatus = require('../../Frameworks_drivers/errorToStatus');

/* Create Exam */
router.post('/:idAdmin', async (req, res, next) => {
  try {
    const { subject, group, year, month, day, hour, minutes } = req.body;

    // Se comprueba  que el ID es un número
    if (!req.params.idAdmin || Number.isNaN(Number(req.params.idAdmin))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID del administrador de exámenes es necesario y debe ser un número', 'id_format_error');
    }

    // Se comprueba si algún dato requerido no ha sido introducido
    if (!subject || !group || !year || !month || !day || !hour || !minutes) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'La asignatura y el grupo son datos necesarios', 'incomplete_data');
    }

    const Data = {
      idAdmin: req.params.idAdmin,
      exam: req.body,
    };
    const exam = await ExamController.createExam(Data);
    res.json(exam);
  } catch (err) {
    // eslint-disable-next-line no-console
    next(err);
  }
});

/* Get Exam */
router.get('/:idAdmin', async (req, res, next) => {
  try {
    // Comprobamos que se reciben el idAdmin y el idUser
    if (!req.params.idAdmin || !req.body.idExam) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs son necesarios para realizar la consulta', 'incomplete_data');
    }

    // Comprobamos que los ids recibidos son números
    if (Number.isNaN(Number(req.params.idAdmin)) || Number.isNaN(Number(req.body.idExam))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs deben ser números', 'id_format_error');
    }

    const examData = {
      idAdmin: req.params.idAdmin,
      idExam: req.body.idExam,
    };

    const exam = await ExamController.getExam(examData);
    res.json(exam);
  } catch (err) {
    next(err);
  }
});

/* Delete Exam */
router.delete('/:idAdmin', async (req, res, next) => {
  try {
    // Se comprueba que se han recibido idAdmin e idUser
    if (!req.params.idAdmin || !req.body.idExam) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El identificador del administrador y el del usuario son necesarios', 'incomplete_data');
    }

    // Se comprueba que idAdmin y idUser sean números
    if (Number.isNaN(Number(req.params.idAdmin)) || Number.isNaN(Number(req.body.idExam))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los ids deben ser números', 'id_format_error');
    }

    const examData = {
      idAdmin: req.params.idAdmin,
      idExam: req.body.idExam,
    };

    await ExamController.deleteExam(examData);
    res.json({ state: 'OK' });
  } catch (err) {
    next(err);
  }
});

/* Modify AdminSystem */
router.patch('/:idAdmin', async (req, res, next) => {
  try {
    // Se comprueba que se ha recibido el idAdmin y el del usuario
    if (!req.params.idAdmin || !req.body.id) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs son necesarios para actualizar el examen', 'id_empty');
    }

    // Se comrprueba que los IDs sean números
    if (Number.isNaN(Number(req.params.idAdmin)) || Number.isNaN(Number(req.body.id))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs deben ser números', 'id_format_error');
    }
    // Se comprueba que al menos exista un dato para ser actualizado
    const { subject, group, year, month, day, hour, minutes } = req.body;
    if (!subject && !group && !year && !month && !day && !hour && minutes) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Es necesario al menos un parámetro para actualizar', 'incomplete_data');
    }

    const examData = {
      idAdmin: req.params.idAdmin,
      ...req.body,
    };

    await ExamController.updateExam(examData);
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
