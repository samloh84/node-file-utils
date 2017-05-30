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


    describe("createReadStreamSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
        });

        it("should create a readable Stream", function (done) {
            var variables = this;
            var tempFile = variables.tempFile;

            var readStream = null;
            (function () {
                try {
                    readStream = FileUtil.createReadStreamSync({path: tempFile.path})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();

            var text = null;
            var chunks = [];
            readStream.on('data', function (chunk) {
                chunks.push(chunk);
            });
            readStream.on('end', function () {
                text = Buffer.concat(chunks).toString('utf8');
                text.should.equal(tempFile.data);
                done();
            });
            readStream.on('error', function (err) {
                throw err;
            });
        });
    });

});
