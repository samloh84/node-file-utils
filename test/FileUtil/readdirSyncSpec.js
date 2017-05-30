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


    describe("readdirSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFiles = TestUtil.generateRandomFiles({parent: tempDir.path});
        });

        it("should list files for the supplied directory path", function () {
            var variables = this;
            var tempDir = variables.tempDir;

            var tempFiles = variables.tempFiles;
            var files = null;
            (function () {
                try {

                    files = FileUtil.readdirSync({path: tempDir.path})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();
            _.each(tempFiles, function (tempFile) {
                files.should.include(_path.basename(tempFile.path));
            })

        });
    });

});
