var _ = require('lodash');
var debug = require('debug')('gegotrex:controller');
var pug = require('pug');
var nconf = require('nconf').env();
var moment = require('moment');
var Promise = require('bluebird');

var mongo = require('../../../lib/mongo');
var various = require('../../../lib/various');

function rootpage(req) {

    debug("welcome to the rootpage");

    return { 'text': 
        pug.compileFile(
            __dirname + '/content.pug', {
                pretty: true,
                debug: false
            }
        )({ content: "nothing yet" })
    };
};

module.exports = rootpage;
