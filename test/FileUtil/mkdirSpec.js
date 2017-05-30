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


    describe("mkdir()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempDirToCreate = _path.resolve(tempDir.path, TestUtil.random.getString(10));

        });

        it("should create a directory", function () {
            var variables = this;
            var tempDirToCreate = variables.tempDirToCreate;

            return FileUtil.mkdir({path: tempDirToCreate})
                .catch(function (err) {
                    console.error(err);
                    throw err;
                })
                .should.be.fulfilled
                .then(function () {
                    var stats = fs.statSync(tempDirToCreate);

                    stats.isDirectory().should.be.true;

                });

        });
    });

});
