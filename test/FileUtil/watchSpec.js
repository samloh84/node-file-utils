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


    xdescribe("watch()", function (done) {

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

            FileUtil.watch({
                filename: tempFile.path, persistent: true
            })
                .catch(function (err) {
                    console.error(err);
                    throw err;
                })
                .should.be.fulfilled
                .then(function (fsWatcher) {
                    fsWatcher.on('change', function (eventType, filename) {
                        filename.should.be.equal(tempFile.path);
                        var text = fs.readFileSync(filename, {encoding: 'utf8'});
                        text.should.be.equal(newTempFileContents);

                        fsWatcher.close();

                        done();
                    });

                    fs.writeFileSync(tempFile.path, newTempFileContents);
                });
        });
    });

});
