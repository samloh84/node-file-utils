const _ = require('lodash');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function createWriteStreamSync
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
 * @returns {WriteStream}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options}
 */
var createWriteStreamSync = function (options) {
    var path = _.get(options, 'path');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var createWriteStreamArgs = [path];

    var flags = _.get(options, 'flags');
    var defaultEncoding = _.get(options, 'defaultEncoding');
    var fd = _.get(options, 'fd');
    var mode = _.get(options, 'mode');
    var autoClose = _.get(options, 'autoClose');
    var start = _.get(options, 'start');

    var createWriteStreamOptions = {
        flags: flags,
        defaultEncoding: defaultEncoding,
        fd: fd,
        mode: mode,
        autoClose: autoClose,
        start: start
    };

    createWriteStreamOptions = _.omitBy(createWriteStreamOptions, _.isUndefined);

    if (!_.isEmpty(createWriteStreamOptions)) {
        createWriteStreamArgs.push(createWriteStreamOptions);
    }

    return fs.createWriteStream.apply(fs, createWriteStreamArgs);

};

module.exports = createWriteStreamSync;
