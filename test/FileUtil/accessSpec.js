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


    describe("access()", function () {
        describe('on file with no permissions', function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path, mode: 0});
            });

            it("should fail on checking access", function () {
                var variables = this;
                var tempFile = variables.tempFile;

                return FileUtil.access({path: tempFile.path, mode: FileUtil.constants.R_OK})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.rejected
                    .tap(function (result) {
                        console.log(util.inspect(result));
                    })

            });

        });

        describe('on file with read permissions', function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
            });

            it("should pass on checking access", function () {
                var variables = this;
                var tempFile = variables.tempFile;

                return FileUtil.access({path: tempFile.path, mode: FileUtil.constants.R_OK})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .tap(function (result) {
                        console.log(util.inspect(result));
                    })
            });
        });

    });

});
