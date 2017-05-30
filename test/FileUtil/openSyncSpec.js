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


    describe("openSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
        });

        afterEach(function () {
            var variables = this;
            var tempFileFd = variables.tempFileFd;
            fs.closeSync(tempFileFd);
        });

        it("should open the file and return a file descriptor", function () {
            var variables = this;
            var tempFile = variables.tempFile;

            var tempFileFd = null;
            (function () {
                try {

                    tempFileFd = FileUtil.openSync({path: tempFile.path, flags: 'r+'})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();

            variables.tempFileFd = tempFileFd;

            var bytesRead, buffer = Buffer.alloc(32);

            var data = [];
            do {
                bytesRead = fs.readSync(tempFileFd, buffer, 0, buffer.length);
                data.push(buffer.slice(0, bytesRead));
            } while (bytesRead > 0);

            data = Buffer.concat(data).toString('utf8');
            data.should.be.equal(tempFile.data);

        });
    });

});
