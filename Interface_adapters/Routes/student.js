const router = require('express').Router();

const studentController = require('../Controllers/StudentController');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../Enterprise_business_rules/Manage_error/codeError');
const errorToStatus = require('../../Frameworks_drivers/errorToStatus');

/* Create Student */
router.post('/', async (req, res, next) => {
  try {
    const { name, fSurname, sSurname, email, idAdmin } = req.body;
    // Se comprueba si algún dato requerido no ha sido introducido
    if (!name || !fSurname || !sSurname || !email || !idAdmin) {
      throw new ResponseError(TYPES_ERROR.ERROR, 'Los parámetros introducidos son incorrectos o están incompletos', 'incomplete_data');
    }

    const student = await studentController.createStudent({ studentData: req.body });
    res.json(student);
  } catch (err) {
    next(err);
  }
});

/* Get Student */
router.get('/:id', async (req, res, next) => {
  try {
    // Comprobamos que se reciben el idAdmin y el idUser
    if (!req.params.id || !req.body.idUser) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Los ids deben ser números', 'incomplete_data');
    }

    // Comprobamos que los ids recibidos son números
    if (Number.isNaN(Number(req.params.id)) || Number.isNaN(Number(req.body.idUser))) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'El ID debe ser un número', 'id_format_error');
    }

    const student = await studentController.getStudent({ usersData: { idAdmin: req.params.id, idUser: req.body.idUser } });
    res.json(student);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  const status = errorToStatus(err);
  res.status(status).json(err.toJSON());
});

module.exports = router;
