const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function readlinkSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/readlink.2.html|readlink(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {String} [options.encoding=utf8] The optional options argument can be a string specifying an encoding, or an object with an encoding property specifying the character encoding to use for the link path passed to the callback. If the encoding is set to 'buffer', the link path returned will be passed as a Buffer object.
 *
 * @returns {String}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_readlinksync_path_options}
 */
var readlinkSync = function (options) {
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

    return fs.readlinkSync.apply(fs, readlinkArgs);

};

module.exports = readlinkSync;
