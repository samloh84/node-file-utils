const Promise = require('bluebird');
const mocha = require('mocha');
const describe = mocha.describe,
    it = mocha.it,
    before = mocha.before,
    beforeEach = mocha.beforeEach,
    after = mocha.after,
    afterEach = mocha.afterEach;
const chai = require("chai");
const util = require('util');
const FileUtil = require('../../lib/index').FileUtil;
const CoreUtil = require('../../lib/index').CoreUtil;
const fs = require('fs');
const _path = require('path');
const _ = require('lodash');
const FileTestUtil = require('../../util/FileTestUtil');
const chaiAsPromised = require("chai-as-promised");

chaiAsPromised.transferPromiseness = function (assertion, promise) {
    _.each(Promise.prototype, function (fn, fnName) {
        if (_.isFunction(fn)) {
            _.set(assertion, fnName, fn.bind(Promise.resolve(promise)));
        }
    });
};

chai.use(chaiAsPromised);
chai.should();
chai.config.includeStack = true;

describe("CoreUtil", function () {
    before(function () {
        var variables = this;
        variables.tempDir = FileTestUtil.mkdtemp();
    });

    after(function () {
        var variables = this;
        var tempDir = variables.tempDir;
        FileTestUtil.rmrf(tempDir);
    });

    describe("chown()", function () {

        describe("on a file", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                var tempFile = variables.tempFile = _path.resolve(tempDir, FileTestUtil.randomString(10));
                var tempFileContents = variables.tempFileContents = FileTestUtil.randomString(32);
                FileTestUtil.writeFileSync(tempFile, tempFileContents, {mode: FileUtil.constants.S_IRWXU | FileUtil.constants.S_IRWXG});
            });

            it("should change the mode of a file", function () {
                var variables = this;
                var tempFile = variables.tempFile;

                return CoreUtil.chown({path: tempFile, uid: 5000, gid: 5000})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function () {
                        var stats = fs.statSync(tempFile);

                        stats.uid.should.be.equal(5000);
                        stats.gid.should.be.equal(5000);
                    })
            });
        });

        describe("on a directory with recursive", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;

                var tempWorkDir = variables.tempWorkDir = _path.resolve(tempDir, FileTestUtil.randomString(10));
                FileTestUtil.mkdir(tempWorkDir);

                var tempSubDirs = variables.tempSubDirs = [];
                var tempFiles = variables.tempFiles = [];
                var tempFilesContents = variables.tempFilesContents = [];
                for (var i = 0; i < Math.ceil(Math.random() * 9) + 1; i++) {
                    tempSubDirs[i] = _path.resolve(tempWorkDir, FileTestUtil.randomString(10));

                    FileTestUtil.mkdir(tempSubDirs[i]);

                    for (var j = 0; j < Math.ceil(Math.random() * 9) + 1; j++) {
                        tempFiles[j] = _path.resolve(tempSubDirs[i], FileTestUtil.randomString(10));
                        tempFilesContents[j] = FileTestUtil.randomString(32);

                        FileTestUtil.writeFileSync(tempFiles[j], tempFilesContents[j], {mode: FileUtil.constants.S_IRWXU});
                    }
                }

            });

            it("should change the mode of all files", function () {
                var variables = this;
                var tempSubDirs = variables.tempSubDirs;
                var tempDir = variables.tempDir;
                var tempFiles = variables.tempFiles;

                return CoreUtil.chown({path: tempDir, recursive: true, uid: 5000, gid: 5000})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function () {
                        _.each(tempSubDirs, function (tempSubDir) {
                            var stats = fs.statSync(tempSubDir);

                            stats.uid.should.be.equal(5000);
                            stats.gid.should.be.equal(5000);
                        });
                        _.each(tempFiles, function (tempFile) {
                            var stats = fs.statSync(tempFile);

                            stats.uid.should.be.equal(5000);
                            stats.gid.should.be.equal(5000);
                        });

                    })
            });
        })

    });

});
