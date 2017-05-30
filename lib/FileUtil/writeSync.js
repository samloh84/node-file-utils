const _ = require('lodash');

const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function writeSync
 *
 * Write string to the file specified by fd. If string is not a string, then the value will be coerced to one.
 *
 *
 * @param {Object} options
 * @param {number} options.fd
 * @param {Buffer|Uint8Array|String} [options.data]
 * @param {number} [options.offset=0]
 * @param {number} [options.length=buffer.length]
 * @param {number} [options.position=null]
 * @param {String} [options.encoding=utf8]
 *
 * @returns {Number} Returns number of bytes written
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_writesync_fd_buffer_offset_length_position}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_writesync_fd_string_position_encoding}
 */
var writeSync = function (options) {

    var fd = _.get(options, 'fd');
    var data = _.get(options, 'data');

    var position = _.get(options, 'position', null);
    var encoding = _.get(options, 'encoding', 'utf8');
    var offset = _.get(options, 'offset', 0);
    var length = _.get(options, 'length', data.length);

    var writeArgs = [fd, data];

    if (!_.isString(data)) {
        if (!_.isUndefined(position)) {
            writeArgs.push(position);
        }

        if (!_.isUndefined(encoding)) {
            writeArgs.push(encoding);
        }
    } else {
        if (!_.isNil(offset)) {
            writeArgs.push(offset);
        }

        if (!_.isNil(length)) {
            writeArgs.push(length);
        }

        if (!_.isUndefined(position)) {
            writeArgs.push(position);
        }
    }

    return fs.writeSync.apply(fs, writeArgs);

};

module.exports = writeSync;
