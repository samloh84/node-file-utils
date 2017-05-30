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


    if (process.platform !== 'darwin') {
        return;
    }

    describe("lchown()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
        });

        it("should change the uid and gid of a file", function () {
            var variables = this;
            var tempFile = variables.tempFile;

            return FileUtil.lchown({path: tempFile.path, uid: 5000, gid: 5000})
                .catch(function (err) {
                    console.error(err);
                    throw err;
                })
                .should.be.fulfilled
                .then(function () {
                    var stats = fs.statSync(tempFile.path);

                    stats.uid.should.be.equal(5000);
                    stats.gid.should.be.equal(5000);
                });
        });
    });

});
