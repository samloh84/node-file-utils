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


    describe("linkSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
        });

        it("should create a link", function () {
            var variables = this;
            var tempDir = variables.tempDir;

            var tempFile = variables.tempFile;
            var tempLinkFile = variables.tempLinkFile = _path.resolve(tempDir.path, TestUtil.random.getString(10));

            (function () {
                try {
                    return FileUtil.linkSync({existingPath: tempFile.path, newPath: tempLinkFile})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();

            var tempFileStats = fs.statSync(tempFile.path);
            var tempLinkFileStats = fs.statSync(tempLinkFile);
            tempFileStats.ino.should.equal(tempLinkFileStats.ino);

        });
    });

});
