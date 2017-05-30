const Promise = require('bluebird');

const util = require('util');
const FileUtil = require('../../lib/index').FileUtil;
const CoreUtil = require('../../lib/index').CoreUtil;
const fs = require('fs');
const _path = require('path');
const _ = require('lodash');

describe("CoreUtil", function () {
    before(function () {
        var variables = this;
        variables.tempDir = TestUtil.createDirectory();
    });
    after(function () {
        var variables = this;
        TestUtil.fs.rm({path: variables.tempDir.parent});
    });

    describe("rm()", function () {

        describe("on a source file path with target file path", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
            });

            it("should delete a file", function () {
                var variables = this;
                var tempDir = variables.tempDir;
                var tempFile = variables.tempFile;
                var tempFileContents = variables.tempFileContents;
                var tempFileDestination = variables.tempFileDestination = _path.resolve(tempDir.path, TestUtil.random.getString(10));

                return CoreUtil.rm({path: tempFile.path})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function () {


                        var check = function () {
                            try {
                                var stats = TestUtil.fs.stat({path: tempFile.path});

                                expect(stats).to.be.null;
                            } catch (err) {
                                console.error(err);
                                throw err;
                            }
                        };
                        check.should.not.throw();
                    })
            });
        });


        describe("on a source directory path with target directory path and recursive = true", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                variables.fileTree = TestUtil.createFileTree({parent: tempDir.path});


            });

            it("should remove a file tree", function () {
                var variables = this;

                var tempDir = variables.tempDir;
                var fileTree = variables.fileTree;


                return CoreUtil.rm({path: fileTree.path, recursive: true})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function () {
                        TestUtil.walkFileTree(fileTree, function (file, stats) {
                            var check = function () {
                                try {
                                    expect(stats).to.be.null;
                                } catch (err) {
                                    console.error(err);
                                    throw err;
                                }
                            };
                            check.should.not.throw();

                        }, true);

                    })
            });
        })

    });
});
