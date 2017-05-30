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


    describe("futimesSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
           var tempFile =  variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
            variables.tempFileFd = fs.openSync(tempFile.path, 'r+');

        });

        afterEach(function () {
            var variables = this;
            var tempFileFd = variables.tempFileFd;
            fs.closeSync(tempFileFd);
        });

        it("should change the mode of a file", function () {
            var variables = this;
            var tempFile = variables.tempFile;
            var tempFileFd = variables.tempFileFd;

            var atime = Math.ceil(Math.random() * 10000);
            var mtime = Math.ceil(Math.random() * 10000);
            (function () {
                try {
                    FileUtil.futimesSync({fd: tempFileFd, atime: atime, mtime: mtime})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();

            var stats = fs.statSync(tempFile.path);

            (stats.atime.getTime() / 1000).should.be.equal(atime);
            (stats.mtime.getTime() / 1000).should.be.equal(mtime);

        });
    });

});
