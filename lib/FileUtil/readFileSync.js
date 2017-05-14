const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function readFileSync
 *
 * Synchronously reads the entire contents of a file.
 *
 * @param {Object} options
 * @param {String|Buffer|Number} options.file
 * @param {String|null} [options.encoding=utf8]
 * @param {String} [options.flag=r]
 *
 * @returns {Buffer}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_readfilesync_file_options}
 */
var readFileSync = function (options) {

    var file = _.get(options, 'file');

    if (_.isString(file) || _.isBuffer(file)) {
        file = _path.resolve(process.cwd(), file);
    }

    var readFileArgs = [file];

    var encoding = _.get(options, 'encoding');
    var mode = _.get(options, 'mode');
    var flag = _.get(options, 'flag');

    var readFileOptions = {
        encoding: encoding,
        flag: flag
    };

    readFileOptions = _.omitBy(readFileOptions, _.isUndefined);

    if (!_.isEmpty(readFileOptions)) {
        readFileArgs.push(readFileOptions);
    }

    return fs.readFileSync.apply(fs, readFileArgs);

};

module.exports = readFileSync;
