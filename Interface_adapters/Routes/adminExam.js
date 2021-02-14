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

router.use((err, req, res, next) => {
  const status = errorToStatus(err);
  res.status(status).json(err.toJSON());
});

module.exports = router;
