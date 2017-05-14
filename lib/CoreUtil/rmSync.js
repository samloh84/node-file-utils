const _ = require('lodash');
const _path = require('path');
const statSync = require("../FileUtil/statSync");
const unlinkSync = require("../FileUtil/unlinkSync");
const rmdirSync = require("../FileUtil/rmdirSync");
const readdirSync = require('../FileUtil/readdirSync');
const lsSync = require('./lsSync');

/**
 * @memberOf CoreUtil
 * @function rmSync
 *
 * @param options
 * @param options.path
 * @param options.recursive
 *
 * @returns {*}
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/rm-invocation.html#rm-invocation}
 */
var rmSync = function (options) {
    var path = _.get(options, 'path');
    var encoding = _.get(options, 'encoding');
    var recursive = _.get(options, 'recursive');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var stats = statSync({path: path});

    var isDirectory = stats.isDirectory();

    if (isDirectory) {
        if (recursive) {
            var files = lsSync({path: path, encoding: encoding, recursive: true});

            files = files.reverse();
            _.each(files, function (fileObject) {
                var filePath = fileObject.path;
                var fileStats = fileObject.stats;
                if (fileStats.isDirectory()) {
                    return rmdirSync({path: filePath});
                } else if (fileStats.isFile()) {
                    return unlinkSync({path: filePath});
                }
            });

        } else {
            throw new Error("Cannot remove directory " + path);
        }
    } else {
        return unlinkSync({path: path});
    }

};

module.exports = rmSync;

