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


    describe("createWriteStreamSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = _path.resolve(tempDir.path, TestUtil.random.getString(10));

        });

        it("should create a writable Stream", function (done) {
            var variables = this;
            var tempFile = variables.tempFile;
            var tempFileContents = TestUtil.random.getString(32);

            var writeStream = null;
            (function () {
                try {
                    writeStream = FileUtil.createWriteStreamSync({path: tempFile});
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();

            writeStream.on('finish', function () {
                var text = fs.readFileSync(tempFile, 'utf8');
                text.should.be.equal(tempFileContents);

                done();
            });

            writeStream.on('error', function (err) {
                done(err);
            });

            writeStream.write(tempFileContents);
            writeStream.end();

        });
    });

});
