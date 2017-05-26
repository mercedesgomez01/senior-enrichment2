'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const pkg = require('../package.json')

const app = express()
module.exports = app

const favicon = require('serve-favicon');

if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (non-production only)
  app.use(require('volleyball'))
  var logMiddleware = require('volleyball');
}

var rootPath = path.join(__dirname, '../');
var indexPath = path.join(rootPath, './public/index.html');
var faviconPath = path.join(rootPath, './public/favicon.ico');
var env = require(path.join(rootPath, './db/index.js'));

// var rootPath = path.join(__dirname, '../../../');
// var indexPath = path.join(rootPath, './browser/index.html');
// var faviconPath = path.join(rootPath, './public/favicon.ico');

// var env = require(path.join(rootPath, './server/env'));



  // setValue and getValue are merely alias
  // for app.set and app.get used in the less
  // common way of setting application variables.
  app.setValue = app.set.bind(app);

  app.getValue = function (path) {
      return app.get(path);
  };


//The code below works because `.use` returns `this` which is `app`. So what we want to return in the `module.exports` is `app`, and we can chain on that declaration because each method invokation returns `app` after mutating based on the middleware functions
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(express.static(path.resolve(__dirname, '..', 'public'))) // Serve static files from ../public
  app.use('/api', require('./routes')) // Serve our api

  app.setValue('env', env);
  app.setValue('projectRoot', rootPath);
  app.setValue('indexHTMLPath', indexPath);
  app.setValue('faviconPath', faviconPath);
  app.setValue('log', logMiddleware);

  // app.get('/*', (_, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')))

  // Logging middleware, set as application
  // variable inside of server/app/configure/app-variables.js
  app.use(app.getValue('log'));

//Static middleware

  var root = app.getValue('projectRoot');

  var npmPath = path.join(root, './node_modules');
  var publicPath = path.join(root, './public');
  var browserPath = path.join(root, './browser');

  app.use(favicon(app.getValue('faviconPath')));
  app.use(express.static(npmPath));
  app.use(express.static(publicPath));
  app.use(express.static(browserPath));


  app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});


app.get('/*', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

if (module === require.main) {
  // Start listening only if we're the main module.

  /* 
    https://nodejs.org/api/modules.html#modules_accessing_the_main_module
      - This (module === require.main) will be true if run via node foo.js, but false if run by require('./foo')
      - If you want to test this, log `require.main` and `module` in this file and also in `api.js`. 
        * Note how `require.main` logs the same thing in both files, because it is always referencing the "main" import, where we starting running in Node 
        * In 'start.js', note how `module` is the same as `require.main` because that is the file we start with in our 'package.json' -- `node server/start.js`
        * In 'api.js', note how `module` (this specific file - i.e. module) is different from `require.main` because this is NOT the file we started in and `require.main` is the file we started in
          ~ To help compare these objects, reference each of their `id` attributes
  */
  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`--- Started HTTP Server for ${pkg.name} ---`)      
      console.log(`Listening on ${JSON.stringify(server.address())}`)
    }
  )
}
                  //Guess we won't create node server with this from react
                  // var server = require('http').createServer();. listen does it for us. :)

