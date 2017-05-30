const _ = require('lodash');
const Promise = require('bluebird');
const _path = require('path');
const stat = require('../FileUtil/stat');
const _walk = require('./_walk');

/**
 * @memberOf CoreUtil
 * @function ls
 *
 * @param options
 * @param options.path
 * @param options.encoding
 * @param options.recursive
 * @returns {*}
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/ls-invocation.html#ls-invocation}
 */
var ls = function (options) {

    var path = _.get(options, 'path');
    var encoding = _.get(options, 'encoding');
    var recursive = _.get(options, 'recursive');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }
    var root = _path.parse(path).root;

    var files = [];

    var callback = function (filePath, fileStats) {
        if (_.isNil(fileStats)) {
            fileStats = stat({path: filePath});
        }

        return Promise.resolve(fileStats)
            .then(function (fileStats) {
                files.push({path: filePath, stats: fileStats});
            });
    };

    return _walk({
        path: path,
        encoding: encoding,
        recursive: recursive,
        callback: callback
    })
        .return(files);

};

module.exports = ls;
