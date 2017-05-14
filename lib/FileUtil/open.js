const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');
const _path = require('path');

/**
 * @memberOf FileUtil
 * @function open
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/open.2.html|open(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {String|number} options.flags
 * @param {Number} [options.mode=0o666]
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback}
 */
var open = function (options) {
    return new Promise(function (resolve, reject) {
        try {

            var path = _.get(options, 'path');

            if (_.isString(path) || _.isBuffer(path)) {
                path = _path.resolve(process.cwd(), path);
            }

            var flags = _.get(options, 'flags');

            var openArgs = [path, flags];

            var mode = _.get(options, 'mode');

            if (!_.isNil(mode)) {
                openArgs.push(mode);
            }

            var callback = function (err, fd) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve(fd);
            };

            openArgs.push(callback);

            return fs.open.apply(fs, openArgs);

        } catch (err) {
            return reject(err);
        }
    });
};

module.exports = open;
