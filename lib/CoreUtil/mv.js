const _ = require('lodash');
const _path = require('path');
const _walk = require('./_walk');
const stat = require("../FileUtil/stat");
const rename = require("../FileUtil/rename");
const mkdir = require("./mkdir");

/**
 * @memberOf CoreUtil
 * @function mv
 *
 * @param options
 * @param options.source
 * @param options.destination
 *
 * @returns {*}
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/mv-invocation.html#mv-invocation}
 */
var mv = function (options) {

    var source = _.get(options, 'source');
    var destination = _.get(options, 'destination');

    if (_.isString(source) || _.isBuffer(source)) {
        source = _path.resolve(process.cwd(), source);
    }

    if (_.isString(destination) || _.isBuffer(destination)) {
        destination = _path.resolve(process.cwd(), destination);
    }

    var move = function (sourcePath, destinationPath) {
        return rename({oldPath: sourcePath, newPath: destinationPath});
    };

    return stat({path: destination})
        .catch(function (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
            return null;
        })
        .then(function (destinationStats) {
            var destinationIsDirectory = !_.isNil(destinationStats) && destinationStats.isDirectory();

            var destinationPath;
            if (destinationIsDirectory) {
                destinationPath = _path.resolve(destination, _path.basename(source));
            } else {
                destinationPath = destination;
            }

            return move(source, destinationPath);
        });


};

module.exports = mv;
