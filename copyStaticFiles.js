'use strict';

const shell = require('shelljs');

// Create target folder 'dist' if it does not exist:
if(!shell.test('-e', 'dist')) { shell.mkdir('dist'); }

// Delete old config files and copy from src folder:
shell.rm('-rf', 'dist/config');
shell.cp("-R", "src/config", "dist/config/");

// Create target folder 'dist/api' if it does not exist:
if(!shell.test('-e', 'dist/api')) { shell.mkdir('dist/api'); }

// Delete old swagger files and copy from src folder:
shell.rm('-rf', 'dist/api/swagger');
shell.cp("-R", "src/api/swagger", "dist/api/swagger/");

// Delete old static server files and copy newer ones:
shell.rm('-rf', 'dist/staticServerFiles');
  // Remove the above line in case you want to keep files generated by the server during runtime
shell.cp("-R", "src/staticServerFiles", "dist/staticServerFiles/");
