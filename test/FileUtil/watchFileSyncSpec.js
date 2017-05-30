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


    xdescribe("watchFileSync()", function (done) {

        beforeEach(function () {
            var variables = this;
            var tempDir = variables.tempDir;
            variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
        });

        it("should read the supplied file", function (done) {
            var variables = this;
            var tempFile = variables.tempFile;

            var tempFileContents = variables.tempFileContents = TestUtil.random.getString(32);
            var newTempFileContents = variables.newTempFileContents = TestUtil.random.getString(32);

            var watchFunction = function () {

                var text = fs.readFileSync(tempFile.path, {encoding: 'utf8'});
                text.should.be.equal(newTempFileContents);

                fs.unwatchFile(tempFile.path, watchFunction)

                done();
            };

            (function () {
                try {
                    return FileUtil.watchFile({
                        filename: tempFile.path, persistent: true,
                        listener: watchFunction
                    })
                } catch (err) {
                    console.error(err);
                    throw err;
                }

            })
                .should.not.throw();

            fs.writeFileSync(tempFile.path, newTempFileContents);

        });
    });

});
