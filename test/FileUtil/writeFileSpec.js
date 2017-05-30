const Promise = require('bluebird');

const util = require('util');
const FileUtil = require('../../lib/index').FileUtil;
const fs = require('fs');
const _path = require('path');
const _ = require('lodash');

describe("FileUtil", function () {
    before(function () {
        var variables = this;
        variables.tempDir = TestUtil.createDirectory();
    });
    after(function () {
        var variables = this;
        TestUtil.fs.rm({path: variables.tempDir.parent});
    });

    describe("writeFile()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            var tempFile = variables.tempFile = _path.resolve(tempDir.path, TestUtil.random.getString(10));

        });

        it("should read the supplied file", function () {
            var variables = this;
            var tempFile = variables.tempFile;

            var tempFileContents = variables.tempFileContents = TestUtil.random.getString(32);

            return FileUtil.writeFile({file: tempFile, data: tempFileContents})
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
