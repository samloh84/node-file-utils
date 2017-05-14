const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function read
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/read.2.html|read(2)}.
 *
 * @param {Object} options
 * @param {number} options.fd
 * @param {Buffer|Uint8Array} options.buffer
 * @param {number} options.offset
 * @param {number} options.length
 * @param {number} options.position
 *
 * @returns {Promise<{bytesRead:Number, buffer:(Buffer|Uint8Array)}>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback}
 */
var read = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var fd = _.get(options, 'fd');

            var buffer = _.get(options, 'buffer');
            var offset = _.get(options, 'offset');
            var length = _.get(options, 'length');
            var position = _.get(options, 'position');

            var callback = function (err, bytesRead, buffer) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve({bytesRead: bytesRead, buffer: buffer});
            };

            return fs.read(fd, buffer, offset, length, position, callback);

        } catch (err) {
            return reject(err);
        }
    });
};

module.exports = read;
