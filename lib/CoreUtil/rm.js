const Promise = require('bluebird');
const _ = require('lodash');
const _path = require('path');
const stat = require("../FileUtil/stat");
const unlink = require("../FileUtil/unlink");
const rmdir = require("../FileUtil/rmdir");
const readdir = require('../FileUtil/readdir');
const _walk = require('./_walk');

/**
 * @memberOf CoreUtil
 * @function rm
 *
 * @param options
 * @param options.path
 * @param options.recursive
 *
 * @returns {*}
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/rm-invocation.html#rm-invocation}
 */
var rm = function (options) {

    var path = _.get(options, 'path');
    var encoding = _.get(options, 'encoding');
    var recursive = _.get(options, 'recursive');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }
    var root = _path.parse(path).root;

    if (path === root) {
        throw new Error("Cannot rm root directory: " + root);
    }

    var files = [];

    var callback = function (filePath, fileStats) {
        if (_.isNil(fileStats)) {
            fileStats = stat({path: filePath});
        }

        return Promise.resolve(fileStats)
            .then(function (fileStats) {
                files.unshift({path: filePath, stats: fileStats});
            });
    };

    return _walk({
        path: path,
        encoding: encoding,
        recursive: recursive,
        includeBasePath: true,
        callback: callback
    })
        .then(function () {
            return Promise.each(files, function (fileObject) {
                var filePath = fileObject.path;
                var fileStats = fileObject.stats;
                if (fileStats.isDirectory()) {
                    return rmdir({path: filePath});
                } else {
                    return unlink({path: filePath});
                }
            });
        });


};

module.exports = rm;

