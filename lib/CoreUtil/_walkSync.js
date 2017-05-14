const _ = require('lodash');
const readdirSync = require('../FileUtil/readdirSync');
const statSync = require('../FileUtil/statSync');
const _path = require('path');

/**
 * @memberOf CoreUtil
 * @function _walkSync
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {fs.Stats} [options.stats]
 * @param {String} [options.encoding]
 * @param {_walkSyncCallback} options.callback
 * @returns {undefined}
 * @private
 */
var _walkSync = function (options) {
    var path = _.get(options, 'path', '.');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var encoding = _.get(options, 'encoding');
    var recursive = _.get(options, 'recursive');

    /**
     *
     * @callback _walkSyncCallback
     * @param {String|Buffer} path
     * @param {fs.Stats} stats
     */
    var callback = _.get(options, 'callback');

    function visit(currentPath, currentPathStats) {
        if (_.isNil(currentPathStats)) {
            currentPathStats = statSync({path: currentPath});
        }

        if (currentPathStats.isDirectory()) {
            var files = readdirSync({path: currentPath, encoding: encoding});

            _.each(files, function (file) {
                var filePath = _path.resolve(currentPath, file);
                var fileStats = statSync({path: filePath});

                callback(filePath, fileStats);
                if (fileStats.isDirectory() && recursive) {
                    return visit(filePath, fileStats);
                }

            });

        } else {
            callback(currentPath, currentPathStats);
        }

    }

    return visit(path);
};

module.exports = _walkSync;