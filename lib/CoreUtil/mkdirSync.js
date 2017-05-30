const _ = require('lodash');
const _path = require('path');
const _mkdirSync = require('../FileUtil/mkdirSync');
const statSync = require('../FileUtil/statSync');

/**
 * @memberOf CoreUtil
 * @function mkdirSync
 *
 * @param options
 * @param options.path
 * @param options.parents
 * @param options.mode
 * @returns {undefined}
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/mkdir-invocation.html#mkdir-invocation}
 */
var mkdirSync = function (options) {

    var path = _.get(options, 'path');
    var parents = _.get(options, 'parents');
    var mode = _.get(options, 'mode');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var performMkdir = function (path) {
        try {
            _mkdirSync({path: path, mode: mode})
        } catch (mkdirErr) {
            try {
                return statSync({path: path})
            } catch (statErr) {
                if (statErr.code === 'ENOENT') {
                    throw mkdirErr;
                } else {
                    return null;
                }
            }
        }
    };

    if (parents) {
        var root = _path.parse(path).root;
        var currentPath = path;
        var paths = [];
        while (currentPath !== root) {
            paths.unshift(currentPath);
            currentPath = _path.dirname(currentPath);
        }

        return _.each(paths, performMkdir);
    } else {
        return performMkdir(path);
    }
};

module.exports = mkdirSync;
