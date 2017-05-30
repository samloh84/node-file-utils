const _ = require('lodash');
const _path = require('path');
const _walkSync = require('./_walkSync');
const statSync = require('../FileUtil/statSync');

/**
 * @memberOf CoreUtil
 * @function lsSync
 *
 * @param options
 * @returns {*}
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/ls-invocation.html#ls-invocation}
 */
var lsSync = function (options) {

    var path = _.get(options, 'path');
    var encoding = _.get(options, 'encoding');
    var recursive = _.get(options, 'recursive');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }
    var root = _path.parse(path).root;

    var files = [];

    var callback = function (filePath, fileStats) {
        if (_.isNil(fileStats)) {
            fileStats = statSync({path: filePath});
        }

        files.push({path: filePath, stats: fileStats});
    };

    _walkSync({
        path: path,
        encoding: encoding,
        recursive: recursive,
        callback: callback
    });
    
    return files;

};

module.exports = lsSync;
