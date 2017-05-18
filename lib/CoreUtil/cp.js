const Promise = require('bluebird');
const _ = require('lodash');
const _path = require('path');
const _walk = require('./_walk');
const createReadStream = require('../FileUtil/createReadStream');
const createWriteStream = require('../FileUtil/createWriteStream');
const utimes = require("../FileUtil/utimes");
const chmod = require("../FileUtil/chmod");
const chown = require("../FileUtil/chown");
const stat = require("../FileUtil/stat");
const mkdir = require("./mkdir");

/**
 * @memberOf CoreUtil
 * @function cp
 *
 * @param {Object} options
 * @param {String|Buffer} options.source
 * @param {String|Buffer} options.destination
 * @param {Boolean} [options.recursive]
 * @param {Boolean} [options.archive]
 * @param {Boolean} [options.parents]
 * @returns {Promise<undefined>}
 *
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/cp-invocation.html#cp-invocation}
 */
var cp = function (options) {
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
        return mkdir({path: destinationParentPath, parents: true})
            .catch(function (err) {
                if (err.code !== 'EEXIST') {
                    throw err;
                }
            })
            .then(function () {
                return Promise.props({
                    sourceReadStream: createReadStream({path: sourcePath, flags: 'r'}),
                    destinationWriteStream: createWriteStream({path: destinationPath, flags: 'w'})
                })
            })
            .then(function (props) {
                return new Promise(function (resolve, reject) {
                    var sourceReadStream = props.sourceReadStream;
                    var destinationWriteStream = props.destinationWriteStream;

                    sourceReadStream.on('error', function (err) {
                        return reject(err);
                    });

                    destinationWriteStream.on('error', function (err) {
                        return reject(err);
                    });

                    destinationWriteStream.on('finish', function () {
                        return resolve();
                    });

                    sourceReadStream.pipe(destinationWriteStream);
                });
            });
    };

    var copyAttributes = function (destinationPath, sourcePathStats) {
        return Promise.all([
            utimes({path: destinationPath, atime: sourcePathStats.atime, mtime: sourcePathStats.mtime}),
            chmod({path: destinationPath, mode: sourcePathStats.mode}),
            chown({path: destinationPath, uid: sourcePathStats.uid, gid: sourcePathStats.gid})
        ]);
    };

    return Promise.props({
        sourceStats: stat({path: source}),
        destinationStats: stat({path: destination})
            .catch(function (err) {
                if (err.code !== 'ENOENT') {
                    throw err;
                }
            })
    })
        .then(function (props) {
            var sourceStats = props.sourceStats;
            var destinationStats = props.destinationStats;

            var sourceIsDirectory = sourceStats.isDirectory();
            var destinationIsDirectory = !_.isNil(destinationStats) && destinationStats.isDirectory();

            if (sourceIsDirectory) {
                if (recursive) {
                    var callback = function (path, stats) {
                        var destinationPath = _path.resolve(destination, _path.relative(source, path));

                        var copyPromise;
                        if (stats.isFile()) {
                            copyPromise = copy(path, destinationPath);
                        } else if (stats.isDirectory()) {
                            copyPromise = mkdir({path: destinationPath, parents: true})
                                .catch(function (err) {
                                    if (err.code !== 'EEXIST') {
                                        throw err;
                                    }
                                });
                        } else {
                            copyPromise = Promise.resolve();
                        }

                        return copyPromise
                            .then(function () {
                                if (archive) {
                                    return copyAttributes(destinationPath, stats);
                                }
                            });
                    };

                    return _walk({
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

                return copy(source, destinationPath)
                    .then(function () {
                        if (archive) {
                            return copyAttributes(destinationPath, sourceStats);
                        }
                    })
            }
        });

};

module.exports = cp;
