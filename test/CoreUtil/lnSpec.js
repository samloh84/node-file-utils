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

    describe("ln()", function () {

        describe("on a file path", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                var tempFile = variables.tempFile = _path.resolve(tempDir, FileTestUtil.randomString(10));
                var tempFileContents = variables.tempFileContents = FileTestUtil.randomString(32);
                FileTestUtil.writeFileSync(tempFile, tempFileContents, {mode: CoreUtil.constants.S_IRWXU | CoreUtil.constants.S_IRWXG});

            });

            it("should create a hard link", function () {
                var variables = this;
                var tempDir = variables.tempDir;

                var tempFile = variables.tempFile;
                var templnFile = variables.templnFile = _path.resolve(tempDir, FileTestUtil.randomString(10));

                return CoreUtil.ln({source: tempFile, destination: templnFile})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function () {
                        var tempFileStats = fs.statSync(tempFile);
                        var templnFileStats = fs.statSync(templnFile);
                        tempFileStats.ino.should.equal(templnFileStats.ino);
                    });
            });

            it("should create a symbolic link", function () {
                var variables = this;
                var tempDir = variables.tempDir;

                var tempFile = variables.tempFile;
                var tempSymlinkFile = variables.tempSymlinkFile = _path.resolve(tempDir, FileTestUtil.randomString(10));

                return CoreUtil.ln({source: tempFile, destination: tempSymlinkFile, symbolic: true})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function () {
                        var tempFileStats = fs.statSync(tempFile);
                        var tempSymlinkFileStats = fs.statSync(tempSymlinkFile);
                        tempFileStats.ino.should.equal(tempSymlinkFileStats.ino);

                        var tempFileSymLinkPath = fs.readlinkSync(tempSymlinkFile, 'utf8')
                        tempFileSymLinkPath.should.equal(tempFile);

                    });
            });
        })

    });

});
