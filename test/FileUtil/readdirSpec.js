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

describe("FileUtil", function () {
    before(function () {
        var variables = this;
        variables.tempDir = FileTestUtil.mkdtemp();
    });

    after(function () {
        var variables = this;
        var tempDir = variables.tempDir;
        FileTestUtil.rmrf(tempDir);
    });

    describe("readdir()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;

            var tempFiles = variables.tempFiles = [];
            var tempFilesContents = variables.tempFilesContents = [];
            for (var i = 0; i < Math.ceil(Math.random() * 9) + 1; i++) {
                tempFiles[i] = _path.resolve(tempDir, FileTestUtil.randomString(10));
                tempFilesContents[i] = FileTestUtil.randomString(32);
                FileTestUtil.writeFileSync(tempFiles[i], tempFilesContents[i], {mode: FileUtil.constants.S_IRWXU | FileUtil.constants.S_IRWXG});
            }
        });


        it("should list files for the supplied directory path", function () {
            var variables = this;
            var tempDir = variables.tempDir;

            var tempFiles = variables.tempFiles;
            return FileUtil.readdir({path: tempDir})
                .catch(function (err) {
                    console.error(err);
                    throw err;
                })
                .should.be.fulfilled
                .then(function (files) {
                    _.each(tempFiles, function (tempFile) {
                        files.should.include(_path.basename(tempFile));
                    })
                });
        });
    });

});
