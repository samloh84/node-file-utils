const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function watchSync
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
 * @returns {fs.FSWatcher} The returned object is a fs.FSWatcher.
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_watch_filename_options_listener}
 */
var watchSync = function (options) {
    var filename = _.get(options, 'filename');

    if (_.isString(filename) || _.isBuffer(filename)) {
        filename = _path.resolve(process.cwd(), filename);
    }

    var watchArgs = [filename];

    var persistent = _.get(options, 'persistent');
    var recursive = _.get(options, 'recursive');
    var encoding = _.get(options, 'encoding');

    var watchOptions = {
        persistent: persistent,
        recursive: recursive,
        encoding: encoding
    };

    watchOptions = _.omitBy(watchOptions, _.isUndefined);
    if (!_.isEmpty(watchOptions)) {
        watchArgs.push(watchOptions);
    }

    var listener = _.get(options, 'listener');

    watchArgs.push(listener);

    return fs.watch.apply(fs, watchArgs);
};

module.exports = watchSync;
