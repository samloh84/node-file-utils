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
 * @param {Boolean} [options.includeBasePath]
 * @returns {undefined}
 * @private
 */
var _walkSync = function (options) {

    var path = _.get(options, 'path', '.');
    var stats = _.get(options, 'stats');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var encoding = _.get(options, 'encoding');

    var recursive = _.get(options, 'recursive', false);
    var includeBasePath = _.get(options, 'includeBasePath', false);

    /**
     *
     * @callback _walkSyncCallback
     * @param {String|Buffer} path
     * @param {fs.Stats} stats
     */
    var callback = _.get(options, 'callback');

    function visit(path, stats) {
        if (_.isNil(stats)) {
            stats = statSync({path: path});
        }


        if (stats.isDirectory()) {


            var files = readdirSync({path: path, encoding: encoding})

            files = _.map(files, function (file) {
                var filePath = _path.resolve(path, file);

                var fileStats = statSync({path: filePath});
                return {path: filePath, stats: fileStats};
            });


            _.each(files, function (file) {
                return callback(file.path, file.stats);
            });


            if (recursive) {
                _.each(files, function (file) {
                    if (file.stats.isDirectory()) {
                        return visit(file.path, file.stats);
                    }
                })
            }


        } else {
            callback(path, stats);
        }
    }


    if (_.isNil(stats)) {
        stats = statSync({path: path});
    }


    if (stats.isDirectory()) {
        var processBasePath;
        if (includeBasePath) {
            callback(path, stats);
        }
        visit(path, stats);
    } else {
        callback(path, stats);
    }
};

module.exports = _walkSync;