const _ = require('lodash');
const _path = require('path');
const statSync = require('../FileUtil/statSync');

const _walkSync = require('./_walkSync');
const _chownSync = require('../FileUtil/chownSync');

const constants = require('../FileUtil/constants');

/**
 * @memberOf CoreUtil
 * @function chownSync
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {String} [options.encoding=utf8]
 * @param {Boolean} options.recursive
 * @param {String|Number} options.uid
 * @param {String|Number} options.gid
 * @returns {undefined}
 *
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/chown-invocation.html#chown-invocation}
 */
var chownSync = function (options) {

    var path = _.get(options, 'path');
    var recursive = _.get(options, 'recursive');
    var encoding = _.get(options, 'encoding');
    var uid = _.get(options, 'uid');
    var gid = _.get(options, 'gid');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }
    var root = _path.parse(path).root;

    if (path === root) {
        throw new Error("Cannot chown root directory: " + root);
    }

    function performChown(filePath, fileStats) {
        if (_.isNil(fileStats)) {
            fileStats = statSync({path: filePath});
        }

        var newUid = _.isNil(uid) ? fileStats.uid : uid;
        var newGid = _.isNil(gid) ? fileStats.gid : gid;
        return _chownSync({path: filePath, uid: newUid, gid: newGid});
    }

    return _walkSync({
        path: path,
        encoding: encoding,
        recursive: recursive,
        includeBasePath: true,
        callback: performChown
    });

};

module.exports = chownSync;