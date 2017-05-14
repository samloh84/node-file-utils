const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function link
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/link.2.html|link(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.existingPath
 * @param {String|Buffer} options.newPath
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_link_existingpath_newpath_callback}
 */
var link = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var existingPath = _.get(options, 'existingPath');
            var newPath = _.get(options, 'newPath');

            if (_.isString(existingPath) || _.isBuffer(existingPath)) {
                existingPath = _path.resolve(process.cwd(), existingPath);
            }

            if (_.isString(newPath) || _.isBuffer(newPath)) {
                newPath = _path.resolve(process.cwd(), newPath);
            }

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.link(existingPath, newPath, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = link;
