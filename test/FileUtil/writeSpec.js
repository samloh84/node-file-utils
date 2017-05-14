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

    describe("write()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            var tempFile = variables.tempFile = _path.resolve(tempDir, FileTestUtil.randomString(10));
            variables.tempFileFd = fs.openSync(tempFile, 'w+');

        });

        afterEach(function () {
            var variables = this;
            var tempFileFd = variables.tempFileFd;
            fs.closeSync(tempFileFd);
        });

        describe("supplied with a Buffer", function () {
            it("should write to the supplied file descriptor", function () {
                var variables = this;
                var tempFile = variables.tempFile;
                var tempFileContents = variables.tempFileContents = FileTestUtil.randomString(32);
                var tempFileFd = variables.tempFileFd;
                var tempFileContentsBuffer = Buffer.from(tempFileContents);
                return FileUtil.write({fd: tempFileFd, buffer: tempFileContentsBuffer})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function () {

                        var text = fs.readFileSync(tempFile);
                        text.toString().should.equal(tempFileContents);
                    });
            });
        });


        describe("supplied with a String", function () {
            it("should write to the supplied file descriptor", function () {
                var variables = this;
                var tempFile = variables.tempFile;
                var tempFileContents = variables.tempFileContents = FileTestUtil.randomString(32);
                var tempFileFd = variables.tempFileFd;

                return FileUtil.write({fd: tempFileFd, string: tempFileContents})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function () {
                        var text = fs.readFileSync(tempFile);
                        text.toString().should.equal(tempFileContents);
                    });
            });
        });


    });

});
