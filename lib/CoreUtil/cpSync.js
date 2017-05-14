const _ = require('lodash');
const _path = require('path');
const _walkSync = require('./_walkSync');
const readSync = require('../FileUtil/readSync');
const writeSync = require('../FileUtil/writeSync');
const utimesSync = require("../FileUtil/utimesSync");
const chmodSync = require("../FileUtil/chmodSync");
const chownSync = require("../FileUtil/chownSync");
const statSync = require("../FileUtil/statSync");
const mkdirSync = require("./mkdirSync");

const openSync = require("../FileUtil/openSync");
const closeSync = require("../FileUtil/closeSync");

/**
 * @memberOf CoreUtil
 * @function cpSync
 *
 * @param {Object} options
 * @param {String|Buffer} options.source
 * @param {String|Buffer} options.destination
 * @param {Boolean} options.recursive
 * @param {Boolean} options.archive
 * @param {Boolean} options.parents
 * @returns {undefined}
 *
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/cp-invocation.html#cp-invocation}
 */
var cpSync = function (options) {
    var source = _.get(options, 'source');
    var destination = _.get(options, 'destination');

    if (_.isString(source) || _.isBuffer(source)) {
        source = _path.resolve(process.cwd(), source);
    }

    if (_.isString(destination) || _.isBuffer(destination)) {
        destination = _path.resolve(process.cwd(), destination);
    }

    var encoding = _.get(options, 'encoding');
    var recursive = _.get(options, 'recursive');
    var archive = _.get(options, 'archive');

    var copy = function (sourcePath, destinationPath) {
        var destinationParentPath = _path.dirname(destinationPath);
        try {
            mkdirSync({path: destinationParentPath, parents: true})
        } catch (err) {
            if (err.code !== 'EEXIST') {
                throw err;
            }
        }

        var sourceFd = openSync({path: sourcePath, flags: 'r'});
        var destinationFd = openSync({path: destinationPath, flags: 'w'});

        var bufferSize = 1024;
        var buffer = Buffer.alloc(bufferSize);

        var bytesRead;
        do {
            bytesRead = readSync({fd: sourceFd, buffer: buffer, offset: 0, length: bufferSize})
            if (bytesRead > 0) {
                writeSync({fd: destinationFd, buffer: buffer, offset: 0, length: bytesRead});
            }
        } while (bytesRead > 0);

        closeSync({fd: sourceFd});
        closeSync({fd: destinationFd});

    };

    var copyAttributes = function (destinationPath, sourcePathStats) {
        utimesSync({path: destinationPath, atime: sourcePathStats.atime, mtime: sourcePathStats.mtime});
        chmodSync({path: destinationPath, mode: sourcePathStats.mode});
        chownSync({path: destinationPath, uid: sourcePathStats.uid, gid: sourcePathStats.gid});
    };

    var sourceStats = statSync({path: source});
    var destinationStats;

    try {
        destinationStats = statSync({path: destination});
    } catch (err) {
        if (err.code === 'ENOENT') {
            destinationStats = null;
        } else {
            throw err;
        }
    }

    var sourceIsDirectory = sourceStats.isDirectory();
    var destinationIsDirectory = !_.isNil(destinationStats) && destinationStats.isDirectory();

    if (sourceIsDirectory) {
        if (recursive) {
            var callback = function (path, stats) {
                var destinationPath = _path.resolve(destination, _path.relative(source, path));
                if (stats.isFile()) {
                    copy(path, destinationPath);
                } else if (stats.isDirectory()) {
                    try {
                        mkdirSync({path: destinationPath, parents: true})
                    } catch (err) {
                        if (err.errorCode !== 'EEXIST') {
                            throw err;
                        }
                    }

                    if (archive) {
                        copyAttributes(destinationPath, stats);
                    }
                }
            };

            return _walkSync({
                path: source,
                stats: sourceStats,
                encoding: encoding,
                recursive: true,
                callback: callback
            });
        } else {
            throw new Error("Cannot copy directory: " + source);
        }
    } else {
        var destinationPath;
        if (destinationIsDirectory) {
            destinationPath = _path.resolve(destination, _path.basename(source));
        } else {
            destinationPath = destination;
        }

        copy(source, destinationPath);
        if (archive) {
            copyAttributes(destinationPath, sourceStats);
        }

    }

};

module.exports = cpSync;
