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

    describe("realpath()", function () {


        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
        });


        it("should read the supplied file descriptor", function () {
            var variables = this;
            var tempDir = variables.tempDir;
            var tempFile = variables.tempFile;

            return FileUtil.realpath({path: tempDir.path + _path.sep + _path.relative(tempDir.path, tempFile.path)})
                .catch(function (err) {
                    console.error(err);
                    throw err;
                })
                .should.be.fulfilled
                .then(function (tempFileRealPath) {
                    tempFileRealPath.should.equal(tempFile.path);
                });
        });
    });

});
