const router = require('express').Router();

const SpaceController = require('../Controllers/SpaceController');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../Enterprise_business_rules/Manage_error/codeError');
const errorToStatus = require('../../Frameworks_drivers/errorToStatus');

/* Create Space */
router.post('/', async (req, res, next) => {
  try {
    const { name, numRows, numSeats, isLab } = req.body;

    // Se comprueba si algún dato requerido no ha sido introducido
    if (!name || !numRows || !numSeats) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'El nombre, número de asientos y número de filas son necesario', 'incomplete_data');
    }
    if (!isLab) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Es necesario recibir si es un laboratorio');
    }
    const space = await SpaceController.createSpace({ spaceData: req.body });
    res.json(space);
  } catch (err) {
    // eslint-disable-next-line no-console
    next(err);
  }
});

/* List Spaces */
router.get('/', async (req, res, next) => {
  try {
    const spaces = await SpaceController.listSpaces();
    res.json(spaces);
  } catch (err) {
    next(err);
  }
});

/* Get Space */
router.get('/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    if (!name) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Es necesario seleccionar un aula o laboratorio', 'incomplete_data');
    }
    const space = await SpaceController.getSpace(name);
    res.json(space);
  } catch (err) {
    next(err);
  }
});

/* Delete Space */
router.delete('/:name', async (req, res, next) => {
  try {
    // Comprobamos que el ID es un número
    if (!req.params.name) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El nombre es necesario para eliminar un aula o laboratorio', 'name_empty');
    }

    await SpaceController.deleteSpace(req.params.name);
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
