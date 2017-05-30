const _ = require('lodash');
const _path = require('path');
const statSync = require("../FileUtil/statSync");
const unlinkSync = require("../FileUtil/unlinkSync");
const rmdirSync = require("../FileUtil/rmdirSync");
const readdirSync = require('../FileUtil/readdirSync');
const _walkSync = require('./_walkSync');

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
    var root = _path.parse(path).root;

    if (path === root) {
        throw new Error("Cannot rm root directory: " + root);
    }

    var files = [];

    var callback = function (filePath, fileStats) {
        if (_.isNil(fileStats)) {
            fileStats = statSync({path: filePath});
        }
        files.unshift({path: filePath, stats: fileStats});
    };

    _walkSync({
        path: path,
        encoding: encoding,
        recursive: recursive,
        includeBasePath: true,
        callback: callback
    })
    return _.each(files, function (fileObject) {
        var filePath = fileObject.path;
        var fileStats = fileObject.stats;
        if (fileStats.isDirectory()) {
            return rmdirSync({path: filePath});
        } else {
            return unlinkSync({path: filePath});
        }
    });

};

module.exports = rmSync;

