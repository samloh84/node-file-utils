const Promise = require('bluebird');
const _ = require('lodash');
const readdir = require('../FileUtil/readdir');
const stat = require('../FileUtil/stat');
const _path = require('path');

/**
 * @memberOf CoreUtil
 * @function _walk
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {fs.Stats} [options.stats]
 * @param {String} [options.encoding]
 * @param {_walkCallback} options.callback
 * @returns {Promise<undefined>}
 * @private
 */
var _walk = function (options) {
    var path = _.get(options, 'path', '.');
    var stats = _.get(options, 'stats');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var encoding = _.get(options, 'encoding');

    var recursive = _.get(options, 'recursive');

    /**
     *
     * @callback _walkCallback
     * @param {String|Buffer} path
     * @param {fs.Stats} stats
     */
    var callback = _.get(options, 'callback');

    function visit(currentPath, currentPathStats) {
        var currentPathStatsPromise;
        if (_.isNil(currentPathStats)) {
            currentPathStatsPromise = stat({path: currentPath});
        } else {
            currentPathStatsPromise = Promise.resolve(currentPathStats);
        }

        return currentPathStatsPromise
            .then(function (currentPathStats) {
                if (currentPathStats.isDirectory()) {
                    return readdir({path: currentPath, encoding: encoding})
                        .then(function (files) {
                            return Promise.each(files, function (file) {
                                var filePath = _path.resolve(currentPath, file);
                                return stat({path: filePath})
                                    .then(function (fileStats) {
                                        return Promise.resolve(callback(filePath, fileStats))
                                            .then(function () {
                                                if (fileStats.isDirectory() && recursive) {
                                                    return visit(filePath, fileStats);
                                                }
                                            });
                                    });
                            });
                        });
                } else {
                    return Promise.resolve(callback(currentPath, currentPathStats));
                }
            });
    }

    return visit(path, stats);
};

module.exports = _walk;