const _ = require('lodash');
const _path = require('path');
const statSync = require("../FileUtil/statSync");
const renameSync = require("../FileUtil/renameSync");
const mkdirSync = require("./mkdir");

/**
 * @memberOf CoreUtil
 * @function mvSync
 *
 * @param options
 * @param options.source
 * @param options.destination
 *
 * @returns {*}
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/mv-invocation.html#mv-invocation}
 */
var mvSync = function (options) {

    var source = _.get(options, 'source');
    var destination = _.get(options, 'destination');

    if (_.isString(source) || _.isBuffer(source)) {
        source = _path.resolve(process.cwd(), source);
    }

    if (_.isString(destination) || _.isBuffer(destination)) {
        destination = _path.resolve(process.cwd(), destination);
    }

    var move = function (sourcePath, destinationPath) {
        return renameSync({oldPath: sourcePath, newPath: destinationPath});
    };


    var stat = function (path) {
        try {
            return statSync({path: path})
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
            return null;
        }
    };

    var destinationStats = stat(destination);
    var destinationIsDirectory = !_.isNil(destinationStats) && destinationStats.isDirectory();

    var destinationPath;
    if (destinationIsDirectory) {
        destinationPath = _path.resolve(destination, _path.basename(source));
    } else {
        destinationPath = destination;
    }

    return move(source, destinationPath);


};

module.exports = mvSync;
