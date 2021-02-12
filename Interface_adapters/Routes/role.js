const router = require('express').Router();

const RoleController = require('../Controllers/RoleController');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../Enterprise_business_rules/Manage_error/codeError');
const errorToStatus = require('../../Frameworks_drivers/errorToStatus');

/* Add Role */
router.post('/', async (req, res, next) => {
  try {
    const { idAdmin, idUser, role } = req.body;
    // Se comprueba si algún dato requerido no ha sido introducido
    if (!idAdmin || !idUser || !role) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Los parámetros introducidos son incorrectos o están incompletos', 'incomplete_data');
    }
    const roleInfo = await RoleController.addRole({ roleData: req.body });
    res.json(roleInfo);
  } catch (err) {
    next(err);
  }
});

/* Modify Role */
router.patch('/', async (req, res, next) => {
  try {
    const { idAdmin, idUser, roleCurrent, roleNew } = req.body;
    // Se comprueba si algún dato requerido no ha sido introducido
    if (!idAdmin || !idUser || !roleCurrent || !roleNew) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Los parámetros introducidos son incorrectos o están incompletos', 'incomplete_data');
    }
    const roleInfo = await RoleController.modifyRole({ roleData: req.body });
    res.json(roleInfo);
  } catch (err) {
    next(err);
  }
});

/* Delete Teacher */
router.delete('/:id', async (req, res, next) => {
  try {
    // Comprobamos que el ID es un número
    if (!req.params.id || Number.isNaN(Number(req.params.id)) || !req.body.idUser || Number.isNaN(Number(req.body.idUser))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }

    const userData = {
      idAdmin: req.params.id,
      idUser: req.body.idUser,
      role: req.body.role,
    };

    await RoleController.deleteRole({ userData });
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
