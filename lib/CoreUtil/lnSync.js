const _ = require('lodash');
const _path = require('path');
const statSync = require("../FileUtil/statSync");
const mkdirSync = require("./mkdirSync");
const linkSync = require("../FileUtil/linkSync");
const symlinkSync = require("../FileUtil/symlinkSync");
/**
 * @memberOf CoreUtil
 * @function lnSync
 *
 * @param options
 * @param options.source
 * @param options.destination
 * @param options.symbolic
 *
 * @returns {*}
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/ln-invocation.html#ln-invocation}
 */
var lnSync = function (options) {
    var source = _.get(options, 'source');
    var destination = _.get(options, 'destination');

    if (_.isString(source) || _.isBuffer(source)) {
        source = _path.resolve(process.cwd(), source);
    }

    if (_.isString(destination) || _.isBuffer(destination)) {
        destination = _path.resolve(process.cwd(), destination);
    }

    var encoding = _.get(options, 'encoding');
    var symbolic = _.get(options, 'symbolic');

    var link = function (sourcePath, destinationPath) {
        var destinationParentPath = _path.dirname(destinationPath);
        try {
            mkdirSync({path: destinationParentPath, parents: true})
        } catch (err) {
            if (err.code !== 'EEXIST') {
                throw err;
            }
        }
        if (symbolic) {
            return symlinkSync({target: sourcePath, path: destinationPath});
        } else {
            return linkSync({existingPath: sourcePath, newPath: destinationPath});
        }

    };

    var destinationStats;
    try {
        destinationStats = statSync({path: destination})
    }

    catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }

        destinationStats = null;
    }
    var destinationIsDirectory = !_.isNil(destinationStats) && destinationStats.isDirectory();

    var destinationPath;
    if (destinationIsDirectory) {
        destinationPath = _path.resolve(destination, _path.basename(source));
    } else {
        destinationPath = destination;
    }

    return link(source, destinationPath);

};

module.exports = lnSync;
