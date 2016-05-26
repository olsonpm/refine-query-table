#!/usr/bin/env node
'use strict';


//---------//
// Imports //
//---------//

const genDoc = require('./index')
  , utils = require('./utils');


//------//
// Main //
//------//

const argv = Array.prototype.slice.call(process.argv, 2);

if (argv[0] !== '-i' || argv[2] !== '-o' || argv.length !== 4) throw new Error("Invalid argv: " + utils.jstring(argv));

const inFile = argv[1]
  , outFile = argv[3];

genDoc(inFile, outFile);
