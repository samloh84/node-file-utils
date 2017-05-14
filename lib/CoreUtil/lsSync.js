const _ = require('lodash');
const _path = require('path');
const _walkSync = require('./_walkSync');

/**
 * @memberOf CoreUtil
 * @function lsSync
 *
 * @param options
 * @returns {*}
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/ls-invocation.html#ls-invocation}
 */
var lsSync = function (options) {
    var path = _.get(options, 'path', '.');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var encoding = _.get(options, 'encoding');
    var recursive = _.get(options, 'recursive');

    var files = [];

    var callback = function (path, stats) {
        files.push({path: path, stats: stats});
    };

    _walkSync({path: path, encoding: encoding, recursive: recursive, callback: callback});

    return files;
};

module.exports = lsSync;
