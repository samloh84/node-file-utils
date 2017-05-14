const _ = require('lodash');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function createReadStreamSync
 *
 * Returns a new ReadStream object.
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
 * @returns {ReadStream}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options}
 */
var createReadStreamSync = function (options) {
    var path = _.get(options, 'path');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var createReadStreamArgs = [path];

    var flags = _.get(options, 'flags');
    var defaultEncoding = _.get(options, 'defaultEncoding');
    var fd = _.get(options, 'fd');
    var mode = _.get(options, 'mode');
    var autoClose = _.get(options, 'autoClose');
    var start = _.get(options, 'start');
    var end = _.get(options, 'end');

    var createReadStreamOptions = {
        flags: flags,
        defaultEncoding: defaultEncoding,
        fd: fd,
        mode: mode,
        autoClose: autoClose,
        start: start,
        end: end
    };

    createReadStreamOptions = _.omitBy(createReadStreamOptions, _.isUndefined);

    if (!_.isEmpty(createReadStreamOptions)) {
        createReadStreamArgs.push(createReadStreamOptions);
    }

    return fs.createReadStream.apply(fs, createReadStreamArgs);

};

module.exports = createReadStreamSync;
