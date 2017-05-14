const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function readFile
 *
 * Asynchronously reads the entire contents of a file.
 *
 * @param {Object} options
 * @param {String|Buffer|Number} options.file
 * @param {String|null} [options.encoding=utf8]
 * @param {String} [options.flag=r]
 *
 * @returns {Promise<Buffer>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback}
 */
var readFile = function (options) {
    return new Promise(function (resolve, reject) {
        try {
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

            var callback = function (err, data) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve(data);
            };

            readFileArgs.push(callback);

            return fs.readFile.apply(fs, readFileArgs);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = readFile;
