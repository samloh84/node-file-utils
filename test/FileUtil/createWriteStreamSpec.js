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


    describe("createWriteStream()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = _path.resolve(tempDir.path, TestUtil.random.getString(10));

        });

        it("should create a writable Stream", function () {
            var variables = this;
            var tempFile = variables.tempFile;
            var tempFileContents = TestUtil.random.getString(32);

            return FileUtil.createWriteStream({path: tempFile})
                .catch(function (err) {
                    console.error(err);
                    throw err;
                })
                .should.be.fulfilled
                .then(function (writeStream) {
                    return new Promise(function (resolve, reject) {
                        writeStream.on('finish', function () {
                            resolve();
                        });

                        writeStream.on('error', function (err) {
                            reject(err);
                        });

                        writeStream.write(tempFileContents);
                        writeStream.end();

                    });
                })
                .catch(function (err) {
                    console.error(err);
                    throw err;
                })
                .should.be.fulfilled
                .then(function () {
                    var text = fs.readFileSync(tempFile, 'utf8');
                    text.should.be.equal(tempFileContents);
                });

        });
    });

});
