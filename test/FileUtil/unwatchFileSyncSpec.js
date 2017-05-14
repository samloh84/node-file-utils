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

    xdescribe("unwatchFile()", function (done) {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            var tempFile = variables.tempFile = _path.resolve(tempDir, FileTestUtil.randomString(10));
            var tempFileContents = variables.tempFileContents = FileTestUtil.randomString(32);

            FileTestUtil.writeFileSync(tempFile, tempFileContents, {mode: FileUtil.constants.S_IRWXU | FileUtil.constants.S_IRWXG});

        });

        it("should read the supplied file", function (done) {
            var variables = this;
            var tempFile = variables.tempFile;

            var tempFileContents = variables.tempFileContents = FileTestUtil.randomString(32);
            var newTempFileContents = variables.newTempFileContents = FileTestUtil.randomString(32);

            var watchFunction = function () {

                var text = fs.readFileSync(tempFile, {encoding: 'utf8'});
                text.should.be.equal(newTempFileContents);

                done(new Error("Failed to unwatch file"));

            };

            fs.watchFile({
                filename: tempFile, persistent: true,
                listener: watchFunction
            });

            (function () {
                try {
                    return FileUtil.unwatchFileSync({filename: tempFile, listener: watchFunction})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();

            fs.writeFileSync(tempFile, newTempFileContents);
            done();

        });
    });

});
