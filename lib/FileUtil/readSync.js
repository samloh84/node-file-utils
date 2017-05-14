const _ = require('lodash');

const fs = require('fs');
const _path = require('path');

/**
 * @memberOf FileUtil
 * @function readSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/read.2.html|read(2)}.
 *
 * @param {Object} options
 * @param {number} options.fd
 * @param {Buffer|Uint8Array} options.buffer
 * @param {number} options.offset
 * @param {number} options.length
 * @param {number} options.position
 *
 * @returns {number} Returns the number of bytesRead
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_readsync_fd_buffer_offset_length_position}
 */
var readSync = function (options) {
    var fd = _.get(options, 'fd');

    var buffer = _.get(options, 'buffer');
    var offset = _.get(options, 'offset');
    var length = _.get(options, 'length');
    var position = _.get(options, 'position');

    return fs.readSync(fd, buffer, offset, length, position);

};

module.exports = readSync;
