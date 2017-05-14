const _ = require('lodash');

const chownSync = require('./chownSync');

const constants = require('../FileUtil/constants');

/**
 * @memberOf CoreUtil
 * @function chgrpSync
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} options.gid
 * @returns {undefined}
 *
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/chgrp-invocation.html#chgrp-invocation}
 */
var chgrp = function (options) {

    var path = _.get(options, 'path');
    var recursive = _.get(options, 'recursive');
    var gid = _.get(options, 'gid');

    return chownSync({path: path, recursive: recursive, gid: gid});
};

module.exports = chgrp;