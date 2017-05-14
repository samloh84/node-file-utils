const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function writeFileSync
 *
 * Synchronously writes data to a file, replacing the file if it already exists. data can be a string or a buffer.
 *
 * @param {Object} options
 * @param {String|Buffer|Number} options.file
 * @param {String|Buffer|Uint8Array} options.data
 * @param {String|null} [options.encoding=utf8]
 * @param {String|null} [options.mode=0o666]
 * @param {String|null} [options.flag=w]
 * @param {String} [options.flag=r]
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options}
 */
var writeFileSync = function (options) {
    var file = _.get(options, 'file');

    if (_.isString(file) || _.isBuffer(file)) {
        file = _path.resolve(process.cwd(), file);
    }

    var data = _.get(options, 'data');

    var writeFileArgs = [file, data];

    var encoding = _.get(options, 'encoding');
    var mode = _.get(options, 'mode');
    var flag = _.get(options, 'flag');

    var writeFileOptions = {
        encoding: encoding,
        mode: mode,
        flag: flag
    };

    writeFileOptions = _.omitBy(writeFileOptions, _.isUndefined);

    if (!_.isEmpty(writeFileOptions)) {
        writeFileArgs.push(writeFileOptions);
    }

    return fs.writeFileSync.apply(fs, writeFileArgs);
};

module.exports = writeFileSync;
