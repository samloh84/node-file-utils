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


    describe("fstat()", function () {

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

        it("should fstat the supplied file descriptor", function () {
            var variables = this;
            var tempFileFd = variables.tempFileFd;

            return FileUtil.fstat({fd: tempFileFd})
                .catch(function (err) {
                    console.error(err);
                    throw err;
                })
                .should.be.fulfilled
                .tap(function (stats) {
                    stats.should.be.an.instanceof(fs.Stats);

                    console.log(util.inspect(stats));
                });
        });
    });

});
