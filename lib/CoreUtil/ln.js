const _ = require('lodash');
const _path = require('path');
const _walk = require('./_walk');
const chmod = require("../FileUtil/chmod");
const chown = require("../FileUtil/chown");
const stat = require("../FileUtil/stat");
const mkdir = require("./mkdir");
const _link = require("../FileUtil/link");
const symlink = require("../FileUtil/symlink");
/**
 * @memberOf CoreUtil
 * @function ln
 *
 * @param options
 * @param options.source
 * @param options.destination
 * @param options.symbolic
 *
 * @returns {*}
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/ln-invocation.html#ln-invocation}
 */
var ln = function (options) {
    var source = _.get(options, 'source');
    var destination = _.get(options, 'destination');

    if (_.isString(source) || _.isBuffer(source)) {
        source = _path.resolve(process.cwd(), source);
    }

    if (_.isString(destination) || _.isBuffer(destination)) {
        destination = _path.resolve(process.cwd(), destination);
    }

    var symbolic = _.get(options, 'symbolic');

    var link = function (sourcePath, destinationPath) {
        var destinationParentPath = _path.dirname(destinationPath);
        return mkdir({path: destinationParentPath, parents: true})
            .catch(function (err) {
                if (err.code !== 'EEXIST') {
                    throw err;
                }
            })
            .then(function () {
                if (symbolic) {
                    return symlink({target: sourcePath, path: destinationPath});
                } else {
                    return _link({existingPath: sourcePath, newPath: destinationPath});
                }
            });
    };

    return stat({path: destination})
        .catch(function (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        })
        .then(function (destinationStats) {
            var destinationIsDirectory = !_.isNil(destinationStats) && destinationStats.isDirectory();

            var destinationPath;
            if (destinationIsDirectory) {
                destinationPath = _path.resolve(destination, _path.basename(source));
            } else {
                destinationPath = destination;
            }

            return link(source, destinationPath);
        });

};

module.exports = ln;
