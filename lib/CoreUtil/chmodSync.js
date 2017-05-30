const _ = require('lodash');
const _path = require('path');
const statSync = require('../FileUtil/statSync');
const _chmodSync = require('../FileUtil/chmodSync');
const _walkSync = require('./_walkSync');
const ModeUtil = require('../ModeUtil');

const constants = require('../FileUtil/constants');

/**
 * @memberOf CoreUtil
 * @function chmodSync
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {String} [options.encoding=utf8]
 * @param {Boolean} options.recursive
 * @param {String|Number} options.mode
 * @returns {undefined}
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html#chmod-invocation}
 */
var chmodSync = function (options) {
    var path = _.get(options, 'path');
    var encoding = _.get(options, 'encoding');
    var recursive = _.get(options, 'recursive');
    var mode = _.get(options, 'mode');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }
    var root = _path.parse(path).root;

    if (path === root) {
        throw new Error("Cannot chmod root directory: " + root);
    }

    var modeOperations = ModeUtil.parseMode(mode);

    function performChmod(filePath, fileStats) {
        if (_.isNil(fileStats)) {
            fileStats = statSync({path: filePath});
        }

        var newMode = ModeUtil.processModeOperations(fileStats, modeOperations);
        return _chmodSync({path: filePath, mode: newMode});
    }


    return _walkSync({
        path: path,
        encoding: encoding,
        recursive: recursive,
        includeBasePath: true,
        callback: performChmod
    });

};

module.exports = chmodSync;