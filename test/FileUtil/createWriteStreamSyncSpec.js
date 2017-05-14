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

    describe("createWriteStreamSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = _path.resolve(tempDir, FileTestUtil.randomString(10));

        });

        it("should create a writable Stream", function (done) {
            var variables = this;
            var tempFile = variables.tempFile;
            var tempFileContents = FileTestUtil.randomString(32);

            var writeStream = null;
            (function () {
                try {
                    writeStream = FileUtil.createWriteStreamSync({path: tempFile});
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();

            writeStream.on('finish', function () {
                var text = fs.readFileSync(tempFile, 'utf8');
                text.should.be.equal(tempFileContents);

                done();
            });

            writeStream.on('error', function (err) {
                done(err);
            });

            writeStream.write(tempFileContents);
            writeStream.end();

        });
    });

});
