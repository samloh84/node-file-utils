const Promise = require('bluebird');
const _ = require('lodash');
const _path = require('path');
const stat = require("../FileUtil/stat");
const unlink = require("../FileUtil/unlink");
const rmdir = require("../FileUtil/rmdir");
const readdir = require('../FileUtil/readdir');
const ls = require('./ls');

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

    return stat({path: path})
        .then(function (stats) {
            var isDirectory = stats.isDirectory();

            if (isDirectory) {
                if (recursive) {
                    return ls({path: path, encoding: encoding, recursive: true})
                        .then(function (files) {
                            files = files.reverse();
                            return Promise.each(files, function (fileObject) {
                                var filePath = fileObject.path;
                                var fileStats = fileObject.stats;
                                if (fileStats.isDirectory()) {
                                    return rmdir({path: filePath});
                                } else if (fileStats.isFile()) {
                                    return unlink({path: filePath});
                                } else {
                                    return Promise.resolve();
                                }
                            });
                        });
                } else {
                    throw new Error("Cannot remove directory " + path);
                }
            } else {
                return unlink({path: path});
            }
        });

};

module.exports = rm;

