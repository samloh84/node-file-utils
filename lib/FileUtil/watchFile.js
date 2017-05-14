const Promise = require('bluebird');

const watchFileSync = require('./watchFileSync');

/**
 * @memberOf FileUtil
 * @function watchFile
 *
 * Watch for changes on filename. The callback listener will be called each time the file is accessed.
 *
 * @param {Object} options
 * @param {String|Buffer} options.filename
 * @param {Boolean} [options.persistent=true] Indicates whether the process should continue to run as long as files are being watched.
 * @param {Boolean} [options.interval=5007] interval property indicating how often the target should be polled in milliseconds.
 * @param {Function} options.listener
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_watchfile_filename_options_listener}
 */
var watchFile = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            return resolve(watchFileSync(options));
        } catch (err) {
            return reject(err);
        }
    })
};

module.exports = watchFile;
