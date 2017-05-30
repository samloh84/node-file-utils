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

    describe("cp()", function () {

        describe("on a source file path with target file path", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
            });

            it("should copy a file", function () {
                var variables = this;
                var tempDir = variables.tempDir;
                var tempFile = variables.tempFile;
                var tempFileContents = variables.tempFileContents;
                var destinationPath = _path.resolve(tempDir.path, TestUtil.random.getString(10));

                var performCp = function () {
                    try {
                        return CoreUtil.cpSync({source: tempFile.path, destination: destinationPath})
                    } catch (err) {
                        console.error(err);
                        throw err;
                    }
                };

                performCp.should.not.throw();


                var checkSource = function () {
                    try {
                        var stats = TestUtil.fs.stat({path: tempFile.path});
                        expect(stats).to.be.not.null;
                    } catch (err) {
                        console.error(err);
                        throw err;
                    }
                };
                checkSource.should.not.throw();

                var checkDestination = function () {
                    try {
                        var stats = TestUtil.fs.stat({path: destinationPath});
                        expect(stats).to.be.not.null;

                        var text = fs.readFileSync(destinationPath, 'utf8');
                        text.should.be.equal(tempFile.data);
                    } catch (err) {
                        console.error(err);
                        throw err;
                    }
                };
                checkDestination.should.not.throw();

            });
        });

        describe("on a source file path with target directory path", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
                variables.destinationDir = TestUtil.createDirectory({parent: tempDir.path});
            });

            it("should copy a file", function () {
                var variables = this;
                var tempFile = variables.tempFile;
                var destinationDir = variables.destinationDir;


                var performCp = function () {
                    try {
                        return CoreUtil.cpSync({source: tempFile.path, destination: destinationDir.path})
                    } catch (err) {
                        console.error(err);
                        throw err;
                    }
                };
                performCp.should.not.throw();


                var checkSource = function () {
                    try {
                        var stats = TestUtil.fs.stat({path: tempFile.path});
                        expect(stats).to.be.not.null;
                    } catch (err) {
                        console.error(err);
                        throw err;
                    }
                };
                checkSource.should.not.throw();

                var checkDestination = function () {
                    try {
                        var expectedDestinationPath = _path.resolve(destinationDir.path, tempFile.name);
                        var stats = TestUtil.fs.stat({path: expectedDestinationPath});
                        expect(stats).to.be.not.null;

                        var text = fs.readFileSync(expectedDestinationPath, 'utf8');
                        text.should.be.equal(tempFile.data);
                    } catch (err) {
                        console.error(err);
                        throw err;
                    }
                };
                checkDestination.should.not.throw();

            });
        });


        describe("on a source directory path with target path and recursive = true", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                variables.fileTree = TestUtil.createFileTree({parent: tempDir.path});

            });

            it("should copy a file tree", function () {
                var variables = this;
                var tempDir = variables.tempDir;
                var fileTree = variables.fileTree;
                var destinationPath = _path.resolve(tempDir.path, TestUtil.random.getString(10));


                var performCp = function () {
                    try {
                        return CoreUtil.cpSync({source: fileTree.path, destination: destinationPath, recursive: true})
                    } catch (err) {
                        console.error(err);
                        throw err;
                    }
                };
                performCp.should.not.throw();


                TestUtil.walkFileTree(fileTree, function (file, stats) {
                    var checkSource = function () {
                        try {
                            expect(stats).to.be.not.null;
                        } catch (err) {
                            console.error(err);
                            throw err;
                        }
                    };
                    checkSource.should.not.throw();

                    var checkDestination = function () {
                        try {
                            var expectedDestinationPath = _path.resolve(destinationPath, _path.relative(fileTree.path, file.path));
                            var stats = TestUtil.fs.stat({path: expectedDestinationPath});
                            expect(stats).to.be.not.null;

                            if (!_.isNil(file.data)) {
                                var text = fs.readFileSync(expectedDestinationPath, 'utf8');
                                text.should.be.equal(file.data);
                            }

                        } catch (err) {
                            console.error(err);
                            throw err;
                        }
                    };
                    checkDestination.should.not.throw();

                });

            });

        });


        describe("on a source directory path with target directory path and recursive = true", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                variables.fileTree = TestUtil.createFileTree({parent: tempDir.path});
                variables.destinationDir = TestUtil.createDirectory({parent: tempDir.path});
            });

            it("should copy a file tree", function () {
                var variables = this;
                var tempDir = variables.tempDir;
                var fileTree = variables.fileTree;
                var destinationDir = variables.destinationDir;


                var performCp = function () {
                    try {
                        return CoreUtil.cpSync({
                            source: fileTree.path,
                            destination: destinationDir.path,
                            recursive: true
                        })
                    } catch (err) {
                        console.error(err);
                        throw err;
                    }
                };
                performCp.should.not.throw();

                TestUtil.walkFileTree(fileTree, function (file, stats) {
                    var checkSource = function () {
                        try {
                            expect(stats).to.be.not.null;
                        } catch (err) {
                            console.error(err);
                            throw err;
                        }
                    };
                    checkSource.should.not.throw();

                    var checkDestination = function () {
                        try {
                            var expectedDestinationPath = _path.resolve(destinationDir.path, _path.relative(fileTree.parent, file.path));
                            var stats = TestUtil.fs.stat({path: expectedDestinationPath});
                            expect(stats).to.be.not.null;


                            if (!_.isNil(file.data)) {
                                var text = fs.readFileSync(expectedDestinationPath, 'utf8');
                                text.should.be.equal(file.data);
                            }

                        } catch (err) {
                            console.error(err);
                            throw err;
                        }
                    };
                    checkDestination.should.not.throw();

                });

            })
        });

    });
});

