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

    describe("chmodSync()", function () {

        describe("on a file", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
            });

            it("should change the mode of a file", function () {
                var variables = this;
                var tempFile = variables.tempFile;

                var performChmod = function () {
                    try {
                        return CoreUtil.chmodSync({path: tempFile.path, mode: 'ug=rwx'})
                    }
                    catch (err) {
                        console.error(err);
                        throw err;
                    }
                };
                performChmod.should.not.throw();


                var check = function () {
                    try {
                        var stats = fs.statSync(tempFile.path);
                        (stats.mode & (parseInt(777, 8))).should.be.equal(FileUtil.constants.S_IRWXU | FileUtil.constants.S_IRWXG);
                    } catch (err) {
                        console.error(err);
                        throw err;
                    }

                };
                check.should.not.throw();

            });
        });

        describe("on a directory with recursive", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;

                variables.fileTree = TestUtil.createFileTree({parent: tempDir.path});


            });

            it("should change the mode of all files", function () {
                var variables = this;
                var tempDir = variables.tempDir;
                var fileTree = variables.fileTree;


                var performChmod = function () {
                    try {
                        return CoreUtil.chmodSync({path: tempDir.path, recursive: true, mode: 'ug=rwx'});
                    }
                    catch (err) {
                        console.error(err);
                        throw err;
                    }
                };
                performChmod.should.not.throw();


                TestUtil.walkFileTree(fileTree, function (file, stats) {

                    var check = function () {
                        try {
                            (stats.mode & (parseInt(777, 8))).should.be.equal(FileUtil.constants.S_IRWXU | FileUtil.constants.S_IRWXG);
                        } catch (err) {
                            console.error(err);
                            throw err;
                        }

                    };
                    check.should.not.throw();
                }, true);
            });
        })

    });

});
