const _ = require('lodash');
const Promise = require('bluebird');
const _path = require('path');
const stat = require('../FileUtil/stat');
const _walk = require('./_walk');
const _chown = require('../FileUtil/chown');
const ModeUtil = require('../ModeUtil');

const constants = require('../FileUtil/constants');

/**
 * @memberOf CoreUtil
 * @function chgrp
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} options.gid
 * @returns {Promise<undefined>}
 *
 * @see {@link https://www.gnu.org/software/coreutils/manual/html_node/chgrp-invocation.html#chgrp-invocation}
 */
var chgrp = function (options) {

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
            fileStats = stat({path: filePath});
        }

        return Promise.resolve(fileStats)
            .then(function (fileStats) {
                var newGid = _.isNil(gid) ? fileStats.gid : gid;
                return _chown({path: filePath, uid: fileStats.uid, gid: newGid});
            });
    }

    return _walk({
        path: path,
        encoding: encoding,
        recursive: recursive,
        includeBasePath: true,
        callback: performChgrp
    });

};

module.exports = chgrp;