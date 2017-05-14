const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function unwatchFileSync
 *
 * Stop watching for changes on filename. If listener is specified, only that particular listener is removed. Otherwise, all listeners are removed and you have effectively stopped watching filename.
 *
 * @param {Object} options
 * @param {String|Buffer} options.filename
 * @param {Function} options.listener
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_unwatchfile_filename_listener}
 */
var unwatchFileSync = function (options) {
    var filename = _.get(options, 'filename');

    if (_.isString(filename) || _.isBuffer(filename)) {
        filename = _path.resolve(process.cwd(), filename);
    }

    var unwatchFileArgs = [filename];

    var listener = _.get(options, 'listener');

    if (!_.isNil(listener)) {
        unwatchFileArgs.push(listener);
    }

    return fs.unwatchFile.apply(fs, unwatchFileArgs);
};

module.exports = unwatchFileSync;
