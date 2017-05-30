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


    describe("rmdirSync()", function () {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempDirToRm = TestUtil.createDirectory({parent: tempDir.path});
        });

        it("should rmdir the supplied path", function () {
            var variables = this;
            var tempDirToRm = variables.tempDirToRm;

            (function () {
                try {
                    return FileUtil.rmdirSync({path: tempDirToRm.path})
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            })
                .should.not.throw();

            (function () {
                var stats = fs.statSync(tempDirToRm.path);
                console.log(util.inspect(stats));
            })
                .should.throw();
        });
    });

});
