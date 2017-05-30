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

    describe("lsSync()", function () {

        describe("on a directory", function () {

            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                variables.tempFiles = TestUtil.generateRandomFiles({parent: tempDir.path});
            });


            it("should list files for the supplied directory path", function () {
                var variables = this;
                var tempDir = variables.tempDir;

                var tempFiles = variables.tempFiles;


                var files = null;
                (function () {
                    try {
                        files = CoreUtil.lsSync({path: tempDir.path})
                    } catch (err) {
                        console.error(err);
                        throw err;
                    }
                })
                    .should.not.throw();

                console.log(util.inspect(files, {depth: null}));

                _.each(tempFiles, function (tempFile) {
                    expect(_.find(files, {path: tempFile.path}), 'Could not find ' + tempFile.path + ' in ls output').to.not.be.undefined;
                })

            });
        });


        describe("on a source directory path with target directory path and recursive = true", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;

                variables.fileTree = TestUtil.createFileTree({parent: tempDir.path});

            });

            it("should list a file tree recursively", function () {
                var variables = this;

                var tempDir = variables.tempDir;
                var fileTree = variables.fileTree;


                var files = null;
                (function () {
                    try {
                        files = CoreUtil.lsSync({path: fileTree.path, recursive: true})
                    } catch (err) {
                        console.error(err);
                        throw err;
                    }
                })
                    .should.not.throw();

                console.log(util.inspect(files, {depth: null}));

                TestUtil.walkFileTree(fileTree, function (file, stats) {
                    var check = function () {

                        var value = _.find(files, {path: file.path});
                        expect(value, 'Could not find file ' + file.path + ' in ls output').to.not.be.undefined;
                    };

                    check.should.not.throw();
                });


            });
        })


    });

});
