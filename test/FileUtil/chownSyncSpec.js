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

    describe("chownSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            var tempFile = variables.tempFile = _path.resolve(tempDir, FileTestUtil.randomString(10));
            var tempFileContents = variables.tempFileContents = FileTestUtil.randomString(32);
            FileTestUtil.writeFileSync(tempFile, tempFileContents, {mode: FileUtil.constants.S_IRWXU | FileUtil.constants.S_IRWXG});
        });

        it("should change the uid and gid of a file", function () {
            var variables = this;
            var tempFile = variables.tempFile;

            (function () {
                try {
                    return FileUtil.chownSync({path: tempFile, uid: 5000, gid: 5000})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();

            var stats = fs.statSync(tempFile);

            stats.uid.should.be.equal(5000);
            stats.gid.should.be.equal(5000);

        });
    });

});
