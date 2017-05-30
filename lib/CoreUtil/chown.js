const _ = require('lodash');
const Promise = require('bluebird');
const _path = require('path');
const stat = require('../FileUtil/stat');

const _walk = require('./_walk');
const _chown = require('../FileUtil/chown');

const constants = require('../FileUtil/constants');

/**
 * @memberOf CoreUtil
 * @function chown
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {String} [options.encoding=utf8]
 * @param {Boolean} options.recursive
 * @param {String|Number} options.uid
 * @param {String|Number} options.gid
 * @returns {Promise<undefined>}
 *
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/chown-invocation.html#chown-invocation}
 */
var chown = function (options) {

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
            fileStats = stat({path: filePath});
        }

        return Promise.resolve(fileStats)
            .then(function (fileStats) {
                var newUid = _.isNil(uid) ? fileStats.uid : uid;
                var newGid = _.isNil(gid) ? fileStats.gid : gid;
                return _chown({path: filePath, uid: newUid, gid: newGid});
            });
    }

    return _walk({
        path: path,
        encoding: encoding,
        recursive: recursive,
        includeBasePath: true,
        callback: performChown
    });
};

module.exports = chown;