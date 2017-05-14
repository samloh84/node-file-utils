const _ = require('lodash');
const _path = require('path');
const _mkdirSync = require('../FileUtil/mkdirSync');

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

    if (parents) {
        var root = _path.parse(path).root;
        var currentPath = path;
        var parentPaths = [];
        while (currentPath !== root) {
            currentPath = _path.dirname(currentPath);
            parentPaths.unshift(currentPath);
        }

        _.each(parentPaths, function (parentPath) {
            try {
                return mkdirSync({path: parentPath, mode: mode})
            }
            catch (err) {
                if (err.code !== 'EEXIST') {
                    throw err;
                }
            }
        });
    }

    return _mkdirSync({path: path, mode: mode});
};

module.exports = mkdirSync;
