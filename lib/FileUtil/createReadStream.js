const Promise = require('bluebird');
const createReadStreamSync = require('./createReadStreamSync');

/**
 * @memberOf FileUtil
 * @function createReadStream
 *
 * Returns a new ReadStream object.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {String} [options.flags=a]
 * @param {String} [options.encoding=null]
 * @param {Number} [options.fd=null]
 * @param {Number} [options.mode=0o666]
 * @param {Boolean} [options.autoClose=true]
 * @param {Number} [options.start=null]
 * @param {Number} [options.end=null]
 *
 * @returns {Promise<ReadStream>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options}
 */
var createReadStream = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            return resolve(createReadStreamSync(options));
        } catch (err) {
            return reject(err);
        }
    });
};

module.exports = createReadStream;
