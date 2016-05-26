'use strict';

//---------//
// Imports //
//---------//

const fp = require('lodash/fp');


//------//
// Main //
//------//

const partial = fp.curry((a, b) => fp.partial(b, a));
const partialRight = fp.curry((a, b) => fp.partialRight(b, a));

const jstring = toStr => JSON.stringify(toStr, null, 2);


//---------//
// Exports //
//---------//

module.exports = {
  jstring: jstring
  , partial: partial
  , partialRight: partialRight
};
