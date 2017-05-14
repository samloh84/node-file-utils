const Promise = require('bluebird');

const unwatchFileSync = require('./unwatchFileSync');

/**
 * @memberOf FileUtil
 * @function unwatchFile
 *
 * Stop watching for changes on filename. If listener is specified, only that particular listener is removed. Otherwise, all listeners are removed and you have effectively stopped watching filename.
 *
 * @param {Object} options
 * @param {String|Buffer} options.filename
 * @param {Function} options.listener
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_unwatchfile_filename_listener}
 */
var unwatchFile = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            return resolve(unwatchFileSync(options));
        } catch (err) {
            return reject(err);
        }
    })
};

module.exports = unwatchFile;
