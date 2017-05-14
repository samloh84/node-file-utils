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

    describe("access()", function () {
        describe('on file with no permissions', function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                var tempFile = variables.tempFile = _path.resolve(tempDir, FileTestUtil.randomString(10));
                var tempFileContents = FileTestUtil.randomString(32);
                FileTestUtil.writeFileSync(tempFile, tempFileContents, {mode: 0});
            });

            it("should fail on checking access", function () {
                var variables = this;
                var tempFile = variables.tempFile;

                return FileUtil.access({path: tempFile, mode: FileUtil.constants.R_OK})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.rejected
                    .tap(function (result) {
                        console.log(util.inspect(result));
                    })

            });

        });

        describe('on file with read permissions', function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                var tempFile = variables.tempFile = _path.resolve(tempDir, FileTestUtil.randomString(10));
                var tempFileContents = FileTestUtil.randomString(32);
                FileTestUtil.writeFileSync(tempFile, tempFileContents, {mode: FileUtil.constants.S_IRUGO});
            });

            it("should pass on checking access", function () {
                var variables = this;
                var tempFile = variables.tempFile;

                return FileUtil.access({path: tempFile, mode: FileUtil.constants.R_OK})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .tap(function (result) {
                        console.log(util.inspect(result));
                    })
            });
        });

    });

});
