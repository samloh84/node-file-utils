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


    describe("unlinkSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
        });

        it("should unlink the supplied path", function () {
            var variables = this;
            var tempFile = variables.tempFile;

            (function () {
                try {
                    return FileUtil.unlinkSync({path: tempFile.path})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();

            (function () {

                var stats = fs.statSync(tempFile.path);
                console.log(util.inspect(stats));

            }).should.throw();

        });
    });

});
