const _ = require('lodash');
const Promise = require('bluebird');
const _path = require('path');
const statSync = require('../FileUtil/stat');
const _walkSync = require('./_walkSync');
const _chownSync = require('../FileUtil/chown');
const ModeUtil = require('../ModeUtil');

const constants = require('../FileUtil/constants');

/**
 * @memberOf CoreUtil
 * @function chgrpSync
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} options.gid
 * @returns {undefined}
 *
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/chgrp-invocation.html#chgrp-invocation}
 */
var chgrpSync = function (options) {

    var path = _.get(options, 'path');
    var recursive = _.get(options, 'recursive');
    var encoding = _.get(options, 'encoding');
    var gid = _.get(options, 'gid');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }
    var root = _path.parse(path).root;

    if (path === root) {
        throw new Error("Cannot chgrp root directory: " + root);
    }

    function performChgrp(filePath, fileStats) {
        if (_.isNil(fileStats)) {
            fileStats = statSync({path: filePath});
        }

        var newGid = _.isNil(gid) ? fileStats.gid : gid;
        return _chownSync({path: filePath, uid: fileStats.uid, gid: newGid});
    }

    return _walkSync({
        path: path,
        encoding: encoding,
        recursive: recursive,
        includeBasePath: true,
        callback: performChgrp
    });
};

module.exports = chgrpSync;