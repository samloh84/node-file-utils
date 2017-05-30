const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function write
 *
 * Write string to the file specified by fd. If string is not a string, then the value will be coerced to one.
 *
 * fd, buffer, offset, length, position
 * fd, string, position, encoding
 *
 * @param {Object} options
 * @param {number} options.fd
 * @param {Buffer|Uint8Array} [options.buffer]
 * @param {number} [options.offset=0]
 * @param {number} [options.length=buffer.length]
 * @param {number} [options.position=null]
 *
 * @param {String} [options.string]
 * @param {number} [options.position=null]
 * @param {String} [options.encoding=utf8]
 *
 * @returns {Promise<{written:number, buffer:(Buffer|Uint8Array)}>}
 *
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_write_fd_string_position_encoding_callback}
 */
var write = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var fd = _.get(options, 'fd');

            var writeArgs, string, position;
            string = _.get(options, 'string');

            if (!_.isNil(string)) {
                writeArgs = [fd, string];

                position = _.get(options, 'position', null);
                if (!_.isUndefined(position)) {
                    writeArgs.push(position);
                }

                var encoding = _.get(options, 'encoding', 'utf8');
                if (!_.isUndefined(encoding)) {
                    writeArgs.push(encoding);
                }

            } else {
                var buffer = _.get(options, 'buffer');

                writeArgs = [fd, buffer];

                var offset = _.get(options, 'offset', 0);
                if (!_.isNil(offset)) {
                    writeArgs.push(offset);
                }

                var length = _.get(options, 'length', buffer.length);
                if (!_.isNil(length)) {
                    writeArgs.push(length);
                }

                position = _.get(options, 'position', 0);
                if (!_.isUndefined(position)) {
                    writeArgs.push(position);
                }
            }

            var callback = function (err, written, buffer) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve({written: written, buffer: buffer});
            };
            writeArgs.push(callback);

            return fs.write.apply(fs, writeArgs);

        } catch (err) {
            return reject(err);
        }
    });
};

module.exports = write;
