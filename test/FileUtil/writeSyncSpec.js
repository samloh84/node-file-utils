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


    describe("writeSync()", function () {


        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            var tempFile = variables.tempFile = _path.resolve(tempDir.path, TestUtil.random.getString(10));
            variables.tempFileFd = fs.openSync(tempFile, 'w+');

        });

        afterEach(function () {
            var variables = this;
            var tempFileFd = variables.tempFileFd;
            fs.closeSync(tempFileFd);
        });

        describe("supplied with a Buffer", function () {
            it("should write to the supplied file descriptor", function () {
                var variables = this;
                var tempFile = variables.tempFile;
                var tempFileContents = variables.tempFileContents = TestUtil.random.getString(32);
                var tempFileFd = variables.tempFileFd;
                var tempFileContentsBuffer = Buffer.from(tempFileContents);

                (function () {
                    try {

                        return FileUtil.writeSync({fd: tempFileFd, data: tempFileContentsBuffer})
                    } catch (err) {
                        console.error(err);
                        throw err;
                    }
                })
                    .should.not.throw();


                var text = fs.readFileSync(tempFile);
                text.toString().should.equal(tempFileContents);

            });
        });


        describe("supplied with a String", function () {
            it("should write to the supplied file descriptor", function () {
                var variables = this;
                var tempFile = variables.tempFile;
                var tempFileContents = variables.tempFileContents = TestUtil.random.getString(32);
                var tempFileFd = variables.tempFileFd;

                (function () {
                    try {

                        return FileUtil.writeSync({fd: tempFileFd, data: tempFileContents})
                    } catch (err) {
                        console.error(err);
                        throw err;
                    }
                })
                    .should.not.throw();


                var text = fs.readFileSync(tempFile);
                text.toString().should.equal(tempFileContents);

            });
        });

    });

});
