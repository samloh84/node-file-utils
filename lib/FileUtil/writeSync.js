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
 * @param {Buffer|Uint8Array} options.buffer
 * @param {number} options.offset
 * @param {number} options.length
 * @param {number} options.position
 *
 * @param {String} options.string
 * @param {String} options.encoding
 *
 * @returns {{written:number, buffer:(Buffer|Uint8Array)}}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_writesync_fd_buffer_offset_length_position}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_writesync_fd_string_position_encoding}
 */
var writeSync = function (options) {

    var fd = _.get(options, 'fd');

    var writeArgs, string, position;
    string = _.get(options, 'string');

    if (!_.isNil(string)) {
        writeArgs = [fd, string];

        position = _.get(options, 'position');
        if (!_.isNil(position)) {
            writeArgs.push(position)
        }

        var encoding = _.get(options, 'encoding');
        if (!_.isNil(encoding)) {
            writeArgs.push(encoding)
        }

    } else {
        var buffer = _.get(options, 'buffer');

        writeArgs = [fd, buffer];

        var offset = _.get(options, 'offset');
        if (!_.isNil(offset)) {
            writeArgs.push(offset)
        }

        var length = _.get(options, 'length');
        if (!_.isNil(length)) {
            writeArgs.push(length)
        }

        position = _.get(options, 'position');
        if (!_.isNil(position)) {
            writeArgs.push(position)
        }
    }

    return fs.writeSync.apply(fs, writeArgs);

};

module.exports = writeSync;