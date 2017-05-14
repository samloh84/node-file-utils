const Promise = require('bluebird');
const createWriteStreamSync = require('./createWriteStreamSync');

/**
 * @memberOf FileUtil
 * @function createWriteStream
 *
 * Returns a new WriteStream object.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {String} [options.flags=a]
 * @param {String} [options.defaultEncoding=utf8]
 * @param {Number} [options.fd=null]
 * @param {Number} [options.mode=0o666]
 * @param {Boolean} [options.autoClose=true]
 * @param {Number} [options.start=null]
 *
 * @returns {Promise<WriteStream>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options}
 */
var createWriteStream = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            return resolve(createWriteStreamSync(options));
        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = createWriteStream;
