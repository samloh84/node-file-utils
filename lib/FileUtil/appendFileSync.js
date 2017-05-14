const _ = require('lodash');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function appendFileSync
 *
 * Synchronously append data to a file, creating the file if it does not yet exist. data can be a string or a buffer.
 *
 * @param {Object} options
 * @param {String|Buffer|Number} options.file
 * @param {String|Buffer} options.data
 * @param {String|null} [options.encoding=utf8]
 * @param {Number} [options.mode=0o666]
 * @param {String} [options.flag=a]
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_appendfilesync_file_data_options}
 */
var appendFileSync = function (options) {

    var file = _.get(options, 'file');
    var data = _.get(options, 'data');

    if (_.isString(file) || _.isBuffer(file)) {
        file = _path.resolve(process.cwd(), file);
    }

    var appendFileArgs = [file, data];

    var encoding = _.get(options, 'encoding');
    var mode = _.get(options, 'mode');
    var flag = _.get(options, 'flag');

    var appendFileOptions = {
        encoding: encoding,
        mode: mode,
        flag: flag
    };

    appendFileOptions = _.omitBy(appendFileOptions, _.isUndefined);

    if (!_.isEmpty(appendFileOptions)) {
        appendFileArgs.push(appendFileOptions);
    }

    return fs.appendFileSync.apply(fs, appendFileArgs);

};

module.exports = appendFileSync;
