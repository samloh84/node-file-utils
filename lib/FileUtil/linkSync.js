const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function linkSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/link.2.html|link(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.existingPath
 * @param {String|Buffer} options.newPath
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_linksync_existingpath_newpath}
 */
var linkSync = function (options) {
    var existingPath = _.get(options, 'existingPath');
    var newPath = _.get(options, 'newPath');

    if (_.isString(existingPath) || _.isBuffer(existingPath)) {
        existingPath = _path.resolve(process.cwd(), existingPath);
    }

    if (_.isString(newPath) || _.isBuffer(newPath)) {
        newPath = _path.resolve(process.cwd(), newPath);
    }

    return fs.linkSync(existingPath, newPath);

};

module.exports = linkSync;
