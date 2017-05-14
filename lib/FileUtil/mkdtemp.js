const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function mkdtemp
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/mkdtemp.2.html|mkdtemp(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.prefix
 * @param {String} [options.encoding=utf8]
 *
 * Note: The fs.mkdtemp() method will append the six randomly selected characters directly to the prefix string. For instance, given a directory /tmp, if the intention is to create a temporary directory within /tmp, the prefix must end with a trailing platform-specific path separator (require('path').sep).
 *
 * @returns {Promise<String>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_mkdtemp_prefix_options_callback}
 */
var mkdtemp = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var prefix = _.get(options, 'prefix');

            if (_.isString(prefix) || _.isBuffer(prefix)) {
                prefix = _path.resolve(process.cwd(), prefix);
            }

            var mkdtempArgs = [prefix];

            var encoding = _.get(options, 'encoding');

            var mkdtempOptions = {
                encoding: encoding
            };

            mkdtempOptions = _.omitBy(mkdtempOptions, _.isUndefined);

            if (!_.isEmpty(mkdtempOptions)) {
                mkdtempArgs.push(mkdtempOptions);
            }

            var callback = function (err, tempPath) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve(tempPath);
            };

            mkdtempArgs.push(callback);

            return fs.mkdtemp.apply(fs, mkdtempArgs);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = mkdtemp;
