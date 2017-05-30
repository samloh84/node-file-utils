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


    describe("mkdtempSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempDirPrefix = _path.resolve(tempDir.path, TestUtil.random.getString(10));

        });

        it("should create a directory", function () {
            var variables = this;
            var tempDirPrefix = variables.tempDirPrefix;

            var newTempDir = null;
            (function () {
                try {

                    newTempDir = FileUtil.mkdtempSync({prefix: tempDirPrefix})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();

            var stats = fs.statSync(newTempDir);
            stats.isDirectory().should.be.true;

        });
    });

});
