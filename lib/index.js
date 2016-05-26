'use strict';


//---------//
// Imports //
//---------//

const fp = require('lodash/fp')
  , bPromise = require('bluebird')
  , bFs = bPromise.promisifyAll(require('fs'))
  , jsBeautify = require('js-beautify')
  , utils = require('./utils');


//------//
// Init //
//------//

const compileTemplate = getCompileTemplate()
  , partialRight = utils.partialRight
  , beautifyHtml = fp.flow(
      fp.ary(2)
      , partialRight([{ indent_size: 2 }])
    )(jsBeautify.html);


//------//
// Main //
//------//

const genDoc = (inPath, outPath) => {
  return bFs.readFileAsync(inPath, 'utf8')
    .then(str => bFs.writeFileAsync(outPath, getHtml(str), 'utf8'));
};


//-------------//
// Helper Fxns //
//-------------//

function getHtml(str) {
  return fp.flow(
    compileTemplate
    , beautifyHtml
  )({ queryHtmlOut: str });
}

function getCompileTemplate() {
  return fp.template(`<!DOCTYPE html>
<html>
  <head>
    <title>sqlite query</title>
    <style>
      html, body {
        font-size: 16px;
        font-family: Helvetica, Arial, 'sans-serif';
      }
      th, td {
        padding: 10px 30px 10px 10px;
        text-align: left;
        border-left: 1px solid #D4D4D4;
      }
      table {
        border-collapse: collapse;
      }
    </style>
  </head>

  <body>
    <table>
      <%= queryHtmlOut %>
    </table>
  </body>
</html>`);
}


//---------//
// Exports //
//---------//

module.exports = genDoc;
