require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { User, Category, News, Comment } = require('./models/models');
const router = require('./routes/index');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');

const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const app = express();
PORT = process.env.PORT || 5000;

const { createAgent } = require('@forestadmin/agent');
const {
  createMongooseDataSource,
} = require('@forestadmin/datasource-mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  createAgent({
    authSecret: process.env.FOREST_AUTH_SECRET,
    envSecret: process.env.FOREST_ENV_SECRET,
    isProduction: process.env.NODE_ENV === 'production',
  })
    .addDataSource(
      createMongooseDataSource(mongoose.connection, { flattenMode: 'none' })
    )
    .mountOnExpress(app)
    .start();
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload());
app.use('/api', router);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(errorMiddleware);

async function main() {
  try {
    mongoose.set('strictQuery', false);
    const mongooseDB = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const adminOptions = {
      rootPath: '/admin',
      resources: [User, Category, News, Comment],
    };

    const admin = new AdminJS(adminOptions);

    const AdminRouter = AdminJSExpress.buildRouter(admin);
    app.use(admin.options.rootPath, AdminRouter);

    app.listen(PORT, () => console.log('Working'));
  } catch (e) {
    return console.log(e);
  }
}

main();
