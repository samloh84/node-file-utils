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


    describe("renameSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
        });

        it("should rename a file", function () {
            var variables = this;
            var tempDir = variables.tempDir;

            var tempFile = variables.tempFile;
            var tempRenameFile = _path.resolve(tempDir.path, TestUtil.random.getString(10));

            (function () {
                try {
                    return FileUtil.renameSync({oldPath: tempFile.path, newPath: tempRenameFile})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            }).should.not.throw();

            var text = fs.readFileSync(tempRenameFile, 'utf8');
            text.should.be.equal(tempFile.data);

        });
    });

});
