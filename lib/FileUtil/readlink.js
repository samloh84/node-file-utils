const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function readlink
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/readlink.2.html|readlink(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {String} [options.encoding=utf8] The optional options argument can be a string specifying an encoding, or an object with an encoding property specifying the character encoding to use for the link path passed to the callback. If the encoding is set to 'buffer', the link path returned will be passed as a Buffer object.
 *
 * @returns {Promise<String>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_readlink_path_options_callback}
 */
var readlink = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var path = _.get(options, 'path');

            if (_.isString(path) || _.isBuffer(path)) {
                path = _path.resolve(process.cwd(), path);
            }

            var readlinkArgs = [path];

            var encoding = _.get(options, 'encoding');

            var readlinkOptions = {
                encoding: encoding
            };

            readlinkOptions = _.omitBy(readlinkOptions, _.isUndefined);

            if (!_.isEmpty(readlinkOptions)) {
                readlinkArgs.push(readlinkOptions);
            }

            var callback = function (err, linkString) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve(linkString);
            };

            readlinkArgs.push(callback);

            return fs.readlink.apply(fs, readlinkArgs);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = readlink;
