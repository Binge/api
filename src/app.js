const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./api/routes/auth');
const notesRoutes = require('./api/routes/notes');

const app = new Koa();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});

app.use(bodyParser());

app.use(authRoutes.routes());
app.use(notesRoutes.routes());

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});