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

    describe("ls()", function () {

        describe("on a directory", function () {

            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;

                var tempFiles = variables.tempFiles = [];
                var tempFilesContents = variables.tempFilesContents = [];
                for (var i = 0; i < Math.ceil(Math.random() * 9) + 1; i++) {
                    tempFiles[i] = _path.resolve(tempDir, FileTestUtil.randomString(10));
                    tempFilesContents[i] = FileTestUtil.randomString(32);
                    FileTestUtil.writeFileSync(tempFiles[i], tempFilesContents[i], {mode: CoreUtil.constants.S_IRWXU | CoreUtil.constants.S_IRWXG});
                }
            });

            it("should list files for the supplied directory path", function () {
                var variables = this;
                var tempDir = variables.tempDir;

                var tempFiles = variables.tempFiles;
                return CoreUtil.ls({path: tempDir})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function (files) {
                        console.log(util.inspect(files, {depth:null}));

                        _.each(tempFiles, function (tempFile) {
                            _.find(files, {path: tempFile}).should.not.be.undefined;
                        })
                    });
            });
        })


        describe("on a source directory path with target directory path and recursive = true", function () {
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

            it("should list a file tree recursively", function () {
                var variables = this;
                var tempWorkDir = variables.tempWorkDir;

                var tempSubDirs = variables.tempSubDirs;
                var tempDir = variables.tempDir;
                var tempFiles = variables.tempFiles;
                var tempFilesContents = variables.tempFilesContents;

                var tempWorkDirDestination = variables.tempWorkDirDestination = _path.resolve(tempDir, FileTestUtil.randomString(10));

                return CoreUtil.ls({path: tempWorkDir, recursive: true})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function (files) {
                        console.log(util.inspect(files, {depth:null}));

                        _.each(tempFiles, function (tempFile) {
                            _.find(files, {path: tempFile}).should.not.be.undefined;
                        })
                    })
            });
        })


    });

});
