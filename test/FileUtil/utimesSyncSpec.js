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


    describe("utimesSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
        });

        it("should change the mode of a file", function () {
            var variables = this;
            var tempFile = variables.tempFile;

            var atime = Math.ceil(Math.random() * 10000);
            var mtime = Math.ceil(Math.random() * 10000);
            (function () {
                try {
                    FileUtil.utimesSync({path: tempFile.path, atime: atime, mtime: mtime})
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
