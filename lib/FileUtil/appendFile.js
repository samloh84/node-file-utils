const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function appendFile
 *
 * Asynchronously append data to a file, creating the file if it does not yet exist. data can be a string or a buffer.
 *
 * @param {Object} options
 * @param {String|Buffer|Number} options.file
 * @param {String|Buffer} options.data
 * @param {String|null} [options.encoding=utf8]
 * @param {Number} [options.mode=0o666]
 * @param {String} [options.flag=a]
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_appendfile_file_data_options_callback}
 */
var appendFile = function (options) {
    return new Promise(function (resolve, reject) {
        try {
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

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            appendFileArgs.push(callback);

            return fs.appendFile.apply(fs, appendFileArgs);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = appendFile;
