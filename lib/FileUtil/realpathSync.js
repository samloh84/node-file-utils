const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function realpathSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man3/realpath.3.html|realpath(3)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {String} [options.encoding=utf8] The optional options argument can be a string specifying an encoding, or an object with an encoding property specifying the character encoding to use for the link path passed to the callback. If the encoding is set to 'buffer', the link path returned will be passed as a Buffer object.
 *
 * @returns {String}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options}
 */
var realpathSync = function (options) {
    var path = _.get(options, 'path');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var realpathSyncArgs = [path];

    var encoding = _.get(options, 'encoding');

    var realpathOptions = {
        encoding: encoding
    };

    realpathOptions = _.omitBy(realpathOptions, _.isUndefined);

    if (!_.isEmpty(realpathOptions)) {
        realpathSyncArgs.push(realpathOptions);
    }

    return fs.realpathSync.apply(fs, realpathSyncArgs);

};

module.exports = realpathSync;
