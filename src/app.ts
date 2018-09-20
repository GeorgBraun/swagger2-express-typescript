import Express from "express";
import * as SwaggerExpress from "swagger-express-mw";

const app: Express.Application = Express();

// For serving static files
const serveIndex = require('serve-index');

// For Swagger UI Express
const jsyaml    = require('js-yaml');
const path      = require("path");
const fs        = require('fs');
const swaggerUi = require('swagger-ui-express');
// Read Swagger-API-Spec as YAML and convert it to a JavaScript object:
const swaggerSpec = jsyaml.safeLoad(fs.readFileSync(path.join(__dirname, './api/swagger/swagger.yaml'), 'utf8'));

const config:SwaggerExpress.Config = {
  appRoot: __dirname, // required config
};

// Create a new list of documents (kind of a replacement for a data base)
import { Documents } from "./services/documents";
export let documents = new Documents();

//console.log("__dirname in app.ts or app.js respectively:", __dirname);

SwaggerExpress.create(config, (err:Error, swaggerExpress:SwaggerExpress.ConnectMiddleware) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  // Serving static files with ftp-like browser ui:
  app.use('/files/', Express.static(path.join(__dirname, "staticServerFiles")), serveIndex(path.join(__dirname, "staticServerFiles"), {icons: true, view: 'details'}));

  // Use Swagger UI Express
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer:false }));

  var port = process.env.PORT || 3333;
  app.listen(port);

  console.log('Server fired up on http://localhost:' + port);
  console.log("===================================================");
});
