const Promise = require('bluebird');
const _ = require('lodash');
const _path = require('path');
const _mkdir = require('../FileUtil/mkdir');
const stat = require('../FileUtil/stat');

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

    var performMkdir = function (path) {
        return _mkdir({path: path, mode: mode})
            .catch(function (mkdirErr) {
                return stat({path: path})
                    .catch(function (statErr) {
                        if (statErr.code === 'ENOENT') {
                            throw mkdirErr;
                        } else {
                            return null;
                        }
                    });
            });
    };

    if (parents) {
        var root = _path.parse(path).root;
        var currentPath = path;
        var paths = [];
        while (currentPath !== root) {
            paths.unshift(currentPath);
            currentPath = _path.dirname(currentPath);
        }

        return Promise.each(paths, performMkdir);
    } else {
        return performMkdir(path);
    }

};

module.exports = mkdir;
