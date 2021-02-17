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

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  const status = errorToStatus(err);
  res.status(status).json(err);
});
module.exports = router;
