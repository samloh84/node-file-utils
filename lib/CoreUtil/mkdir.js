const Promise = require('bluebird');
const _ = require('lodash');
const _path = require('path');
const _mkdir = require('../FileUtil/mkdir');

/**
 * @memberOf CoreUtil
 * @function mkdir
 *
 * @param options
 * @param options.path
 * @param options.parents
 * @param options.mode
 * @returns {undefined}
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/mkdir-invocation.html#mkdir-invocation}
 */
var mkdir = function (options) {
    var path = _.get(options, 'path');
    var parents = _.get(options, 'parents');
    var mode = _.get(options, 'mode');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var mkdirParentsPromise;

    if (parents) {
        var root = _path.parse(path).root;
        var currentPath = path;
        var parentPaths = [];
        while (currentPath !== root) {
            currentPath = _path.dirname(currentPath);
            parentPaths.unshift(currentPath);
        }

        mkdirParentsPromise = Promise.each(parentPaths, function (parentPath) {
            return mkdir({path: parentPath, mode: mode})
                .catch(function (err) {
                    if (err.code !== 'EEXIST') {
                        throw err;
                    }
                });
        });
    } else {
        mkdirParentsPromise = Promise.resolve()
    }

    return mkdirParentsPromise
        .then(function () {
            return _mkdir({path: path, mode: mode});
        });
};

module.exports = mkdir;
