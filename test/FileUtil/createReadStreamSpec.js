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


    describe("createReadStream()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
        });

        it("should create a readable Stream", function () {
            var variables = this;
            var tempFile = variables.tempFile;

            return FileUtil.createReadStream({path: tempFile.path})
                .catch(function (err) {
                    console.error(err);
                    throw err;
                })
                .should.be.fulfilled
                .then(function (readStream) {
                    return new Promise(function (resolve, reject) {
                        var chunks = [];
                        readStream.on('data', function (chunk) {
                            chunks.push(chunk);
                        });
                        readStream.on('end', function () {
                            return resolve(Buffer.concat(chunks).toString('utf8'));
                        });
                        readStream.on('error', function (err) {
                            return reject(err);
                        });
                    })
                })
                .then(function (text) {
                    text.should.equal(tempFile.data);
                });
        });
    });

});
