const Router = require('koa-router');
const notesController = require('../controllers/notes');
const authMiddleware = require('../middleware/auth');

const router = new Router();

router.post('/notes', authMiddleware, notesController.createNote);
router.put('/notes/:id', authMiddleware, notesController.updateNote);

module.exports = router;