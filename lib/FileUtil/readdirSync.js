const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function readdirSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man3/readdir.3.html|readdir(3)}. Reads the contents of a directory.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {String} [options.encoding=utf8] The optional options argument can be a string specifying an encoding, or an object with an encoding property specifying the character encoding to use for the filenames passed to the callback. If the encoding is set to 'buffer', the filenames returned will be passed as Buffer objects.
 *
 * @returns {String[]} Returns an array of the names of the files in the directory excluding '.' and '..'.
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options}
 */
var readdirSync = function (options) {
    var path = _.get(options, 'path');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var readdirArgs = [path];

    var encoding = _.get(options, 'encoding');

    var readdirOptions = {
        encoding: encoding
    };

    readdirOptions = _.omitBy(readdirOptions, _.isUndefined);

    if (!_.isEmpty(readdirOptions)) {
        readdirArgs.push(readdirOptions);
    }

    return fs.readdirSync.apply(fs, readdirArgs);

};

module.exports = readdirSync;
