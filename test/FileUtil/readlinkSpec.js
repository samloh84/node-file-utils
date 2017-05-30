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


    describe("readlink()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            var tempFile = variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
            var tempFileSymLink = variables.tempFileSymLink = _path.resolve(tempDir.path, TestUtil.random.getString(10));
            fs.symlinkSync(tempFile.path, tempFileSymLink);

        });

        it("should read the supplied file descriptor", function () {
            var variables = this;
            var tempFile = variables.tempFile;
            var tempFileSymLink = variables.tempFileSymLink;

            return FileUtil.readlink({path: tempFileSymLink})
                .catch(function (err) {
                    console.error(err);
                    throw err;
                })
                .should.be.fulfilled
                .then(function (tempFileSymLinkPath) {
                    tempFileSymLinkPath.should.equal(tempFile.path);
                });
        });
    });

});
