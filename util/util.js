const headers = require('../config/header.json');
const fs = require('fs');


exports.randomHeader = () => ({'User-Agent':headers[ Math.floor( Math.random() * headers.length) ]})
