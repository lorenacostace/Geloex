const router = require('express').Router();

const AdminSystemController = require('../Controllers/AdminSystemController');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../Enterprise_business_rules/Manage_error/codeError');
const errorToStatus = require('../../Frameworks_drivers/errorToStatus');

/* Create AdminSystem */
router.post('/', async (req, res, next) => {
  try {
    const { name, fSurname, sSurname, email } = req.body;
    // Se comprueba si algún dato requerido no ha sido introducido
    if (!name || !fSurname || !sSurname || !email) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Los parámetros introducidos son incorrectos o están incompletos', 'incomplete_data');
    }

    // eslint-disable-next-line max-len
    const adminSystem = await AdminSystemController.createAdminSystem({ adminSystemData: req.body });
    res.json(adminSystem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
