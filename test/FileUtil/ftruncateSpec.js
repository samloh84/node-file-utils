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


    describe("ftruncate()", function () {

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

        it("should ftruncate the supplied file descriptor", function () {
            var variables = this;
            var tempFileFd = variables.tempFileFd;
            var tempFile = variables.tempFile;

            return FileUtil.ftruncate({
                fd: tempFileFd,
                len: Buffer.from(tempFile.data.slice(0, 16), 'utf8').byteLength
            })
                .catch(function (err) {
                    console.error(err);
                    throw err;
                })
                .should.be.fulfilled
                .then(function () {

                    var text = fs.readFileSync(tempFile.path, 'utf8');
                    text.should.be.equal(tempFile.data.slice(0, 16));
                })
        });
    });

});
