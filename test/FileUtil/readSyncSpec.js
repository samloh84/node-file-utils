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


    describe("readSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            var tempFile = variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
            variables.tempFileFd = fs.openSync(tempFile.path, 'r+');

        });

        afterEach(function () {
            var variables = this;
            var tempFileFd = variables.tempFileFd;
            fs.closeSync(tempFileFd);
        });

        it("should read the supplied file descriptor", function () {
            var variables = this;
            var tempFile = variables.tempFile;
            var tempFileFd = variables.tempFileFd;

            var buffer = Buffer.alloc(Buffer.byteLength(tempFile.data));

            (function () {
                try {

                    return FileUtil.readSync({fd: tempFileFd, buffer: buffer, offset: 0, length: buffer.length})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })

                .should.not.throw();

            buffer.toString().should.equal(tempFile.data);

        });
    });

});
