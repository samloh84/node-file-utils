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


    describe("chmod()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
        });

        it("should change the mode of a file", function () {
            var variables = this;
            var tempFile = variables.tempFile;

            return FileUtil.chmod({path: tempFile.path, mode: FileUtil.constants.S_IRWXU})
                .catch(function (err) {
                    console.error(err);
                    throw err;
                })
                .should.be.fulfilled
                .then(function () {
                    var stats = fs.statSync(tempFile.path);

                    (stats.mode & (parseInt(7777, 8))).should.be.equal(FileUtil.constants.S_IRWXU);
                })
        });
    });

});
