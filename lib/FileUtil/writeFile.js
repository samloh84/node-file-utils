const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function writeFile
 *
 * Asynchronously writes data to a file, replacing the file if it already exists. data can be a string or a buffer.
 *
 * @param {Object} options
 * @param {String|Buffer|Number} options.file
 * @param {String|Buffer|Uint8Array} options.data
 * @param {String|null} [options.encoding=utf8]
 * @param {String|null} [options.mode=0o666]
 * @param {String|null} [options.flag=w]
 * @param {String} [options.flag=r]
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback}
 */
var writeFile = function (options) {
    return new Promise(function (resolve, reject) {
        try {
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

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            writeFileArgs.push(callback);

            return fs.writeFile.apply(fs, writeFileArgs);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = writeFile;
