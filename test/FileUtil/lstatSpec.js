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


    describe("lstat()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
        });

        it("should lstat the supplied file descriptor", function () {
            var variables = this;
            var tempFile = variables.tempFile;

            return FileUtil.lstat({path: tempFile.path})
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
