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


    describe("rmdir()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempDirToRm = TestUtil.createDirectory({parent: tempDir.path});
        });

        it("should rmdir the supplied path", function () {
            var variables = this;
            var tempDirToRm = variables.tempDirToRm;

            return FileUtil.rmdir({path: tempDirToRm.path})
                .catch(function (err) {
                    console.error(err);
                    throw err;
                })
                .should.be.fulfilled
                .then(function () {
                    var stats = fs.statSync(tempDirToRm.path);
                    console.log(util.inspect(stats));
                })
                .should.be.rejected;
        });
    });

});
