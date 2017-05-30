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

    describe("symlinkSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
        });

        it("should create a symlink", function () {
            var variables = this;
            var tempDir = variables.tempDir;

            var tempFile = variables.tempFile;
            var tempSymlinkFile = variables.tempsymlinkFile = _path.resolve(tempDir.path, TestUtil.random.getString(10));

            (function () {
                try {
                    return FileUtil.symlinkSync({target: tempFile.path, path: tempSymlinkFile})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();

            var tempFileStats = fs.statSync(tempFile.path);
            var tempSymlinkFileStats = fs.statSync(tempSymlinkFile);
            tempFileStats.ino.should.equal(tempSymlinkFileStats.ino);

            var tempFileSymLinkPath = fs.readlinkSync(tempSymlinkFile)
            tempFileSymLinkPath.should.equal(tempFile.path);

        });
    });

});
