const _ = require('lodash');

const fs = require('fs');
const _path = require('path');

/**
 * @memberOf FileUtil
 * @function openSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/open.2.html|open(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {String|number} options.flags
 * @param {Number} [options.mode=0o666]
 *
 * @returns {Number}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_opensync_path_flags_mode}
 */
var openSync = function (options) {

    var path = _.get(options, 'path');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var flags = _.get(options, 'flags');

    var openSyncArgs = [path, flags];

    var mode = _.get(options, 'mode');

    if (!_.isNil(mode)) {
        openSyncArgs.push(mode);
    }

    return fs.openSync.apply(fs, openSyncArgs);

};

module.exports = openSync;
