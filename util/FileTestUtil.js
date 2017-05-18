const fs = require('fs');
const _path = require('path');
const _ = require('lodash');

const FILE_UTIL_TEST_TMP_DIR_ROOT = _.get(process, 'env.FILE_UTIL_TEST_TMP_DIR_ROOT', '/tmp');
const FILE_UTIL_TEST_TMP_DIR_PREFIX = _.get(process, 'env.FILE_UTIL_TEST_TMP_DIR_PREFIX', 'FileUtilTest-');

var FileTestUtil = {};
FileTestUtil.randomString = function (length) {
    if (_.isNil(length)) {
        length = 8;
    }

    var string = [];
    for (var i = 0; i < length; i++) {
        string.push(String.fromCharCode(Math.ceil(Math.random() * ('Z'.charCodeAt(0) - 'A'.charCodeAt(0))) + 'A'.charCodeAt(0)));
    }

    return string.join('');
};

FileTestUtil.mkdtemp = function (prefix) {
    if (_.isNil(prefix)) {
        prefix = _path.resolve(FILE_UTIL_TEST_TMP_DIR_ROOT, FILE_UTIL_TEST_TMP_DIR_PREFIX);
    }

    return fs.mkdtempSync(prefix);
};

FileTestUtil.mkdir = function (path) {
    try {
        return fs.mkdirSync(path);
    } catch (err) {
        if (err.errorCode !== 'EEXIST') {
            throw err;
        }
        return null;
    }
};

FileTestUtil.writeFileSync = function (path, content, options) {
    if (_.isNil(path)) {
        path = _path.resolve('/tmp/FileUtilSpecs-', FileTestUtil.randomString());
    }

    return fs.writeFileSync(path, content, options);
};

FileTestUtil.rmrf = function (path) {
    var files = [];
    var queue = [path];
    while (!_.isEmpty(queue.length)) {
        var currentFilePath = queue.pop();
        var currentFileStats = fs.statSync(currentFilePath);

        if (currentFileStats.isDirectory() || currentFileStats.isFile()) {
            files.unshift({path: currentFilePath, stats: currentFileStats});

            if (currentFileStats.isDirectory()) {
                queue.concat(_.map(fs.readdirSync(currentFilePath), function (dirFile) {
                    return _path.resolve(currentFilePath, dirFile);
                }));
            }
        }

    }

    _.each(files, function (file) {
        if (file.stats.isDirectory()) {
            fs.rmdir(file.path);
        } else if (file.stats.isFile()) {
            fs.unlinkSync(file.path);
        }
    })

};


module.exports = FileTestUtil;