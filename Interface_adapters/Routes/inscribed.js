const router = require('express').Router();

const InscribedController = require('../Controllers/InscribedController');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../Enterprise_business_rules/Manage_error/codeError');
const errorToStatus = require('../../Frameworks_drivers/errorToStatus');

/* Create Inscribed */
router.post('/:idStudent', async (req, res, next) => {
  try {
    // Se comprueba que se recibe el id del estudiante y el id del examen
    if (!req.params.idStudent || !req.body.idExam) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID del estudiante y el ID del examen son necesarios', 'id_format_error');
    }

    if (Number.isNaN(Number(req.params.idStudent)) || Number.isNaN(Number(req.body.idExam))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID del administrador de exámenes es necesario y debe ser un número', 'id_format_error');
    }
    const inscribedData = {
      UserId: req.params.idStudent,
      ExamId: req.body.idExam,
    };
    const exam = await InscribedController.createInscribed(inscribedData);
    res.json(exam);
  } catch (err) {
    next(err);
  }
});

/* Delete AdminSystem */
router.delete('/:idStudent', async (req, res, next) => {
  try {
    // Se comprueba que se han recibido idAdmin e idUser
    if (!req.params.idStudent || !req.body.idExam) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El identificador del administrador y el del usuario son necesarios', 'incomplete_data');
    }

    // Se comprueba que idAdmin y idUser sean números
    if (Number.isNaN(Number(req.params.idStudent)) || Number.isNaN(Number(req.body.idExam))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los ids deben ser números', 'id_format_error');
    }

    const inscribedData = {
      UserId: req.params.idStudent,
      ExamId: req.body.idExam,
    };

    await InscribedController.deleteInscribed(inscribedData);
    res.json({ state: 'OK' });
  } catch (err) {
    next(err);
  }
});

/* Get Inscribed */
router.get('/:idAdmin', async (req, res, next) => {
  try {
    // Comprobamos que se reciben el idAdmin y el idUser
    if (!req.params.idAdmin || !req.body.idStudent) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs son necesarios para realizar la consulta', 'incomplete_data');
    }

    // Comprobamos que los ids recibidos son números
    if (Number.isNaN(Number(req.params.idAdmin)) || Number.isNaN(Number(req.body.idStudent))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs deben ser números', 'id_format_error');
    }

    const inscribedData = {
      idAdmin: req.params.idAdmin,
      idStudent: req.body.idStudent,
    };

    const inscriptions = await InscribedController.getInscribed(inscribedData);
    res.json(inscriptions);
  } catch (err) {
    next(err);
  }
});

/* Get Inscribed */
router.get('/', async (req, res, next) => {
  try {
    // Comprobamos que se reciben el idAdmin y el idUser
    if (!req.body.idAdmin || !req.body.idExam) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs son necesarios para realizar la consulta', 'incomplete_data');
    }

    // Comprobamos que los ids recibidos son números
    if (Number.isNaN(Number(req.body.idAdmin)) || Number.isNaN(Number(req.body.idExam))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los IDs deben ser números', 'id_format_error');
    }

    const inscribedData = {
      idAdmin: req.body.idAdmin,
      idExam: req.body.idExam,
    };

    const inscriptions = await InscribedController.listInscribed(inscribedData);
    res.json(inscriptions);
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
