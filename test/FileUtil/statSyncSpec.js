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


    describe("statSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
           var tempFile =  variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
            variables.tempFileFd = fs.openSync(tempFile.path, 'r+');

        });

        it("should stat the supplied file descriptor", function () {
            var variables = this;
            var tempFile = variables.tempFile;

            var stats = null;
            (function () {
                try {

                    stats = FileUtil.statSync({path: tempFile.path})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();

            stats.should.be.an.instanceof(fs.Stats);

            console.log(util.inspect(stats));

        });
    });

});
