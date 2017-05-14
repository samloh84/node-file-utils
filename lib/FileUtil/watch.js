const Promise = require('bluebird');

const watchSync = require('./watchSync');

/**
 * @memberOf FileUtil
 * @function watch
 *
 * Watch for changes on filename, where filename is either a file or a directory.
 *
 * @param {Object} options
 * @param {String|Buffer} options.filename
 * @param {Boolean} [options.persistent=true] Indicates whether the process should continue to run as long as files are being watched.
 * @param {Boolean} [options.recursive=false]  Indicates whether all subdirectories should be watched, or only the current directory. The applies when a directory is specified, and only on supported platforms
 * @param {String} [options.encoding=utf8] Specifies the character encoding to be used for the filename passed to the listener.
 * @param {Function} options.listener
 *
 * @returns {Promise<fs.FSWatcher>} The returned object is a fs.FSWatcher.
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_watch_filename_options_listener}
 */
var watch = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            return resolve(watchSync(options));
        } catch (err) {
            return reject(err);
        }
    })
};

module.exports = watch;
