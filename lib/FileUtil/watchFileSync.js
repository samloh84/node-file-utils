const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function watchFileSync
 *
 * Watch for changes on filename. The callback listener will be called each time the file is accessed.
 *
 * @param {Object} options
 * @param {String|Buffer} options.filename
 * @param {Boolean} [options.persistent=true] Indicates whether the process should continue to run as long as files are being watched.
 * @param {Boolean} [options.interval=5007] interval property indicating how often the target should be polled in milliseconds.
 * @param {Function} options.listener
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_watchfile_filename_options_listener}
 */
var watchFileSync = function (options) {
    var filename = _.get(options, 'filename');

    if (_.isString(filename) || _.isBuffer(filename)) {
        filename = _path.resolve(process.cwd(), filename);
    }

    var watchFileArgs = [filename];

    var persistent = _.get(options, 'persistent');
    var interval = _.get(options, 'interval');

    var watchFileOptions = {
        persistent: persistent,
        interval: interval
    };

    watchFileOptions = _.omitBy(watchFileOptions, _.isUndefined);
    if (!_.isEmpty(watchFileOptions)) {
        watchFileArgs.push(watchFileOptions);
    }

    var listener = _.get(options, 'listener');

    watchFileArgs.push(listener);

    return fs.watchFile.apply(fs, watchFileArgs);
};

module.exports = watchFileSync;
