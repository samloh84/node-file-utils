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

    describe("chown()", function () {

        describe("on a file", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                variables.tempFile = TestUtil.generateRandomFile({parent: tempDir.path});
            });

            it("should change the mode of a file", function () {
                var variables = this;
                var tempFile = variables.tempFile;

                return CoreUtil.chown({path: tempFile.path, uid: 5000, gid: 5000})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function () {
                        var check = function () {
                            try {
                                var stats = fs.statSync(tempFile.path);

                                stats.uid.should.be.equal(5000);
                                stats.gid.should.be.equal(5000);
                            } catch (err) {
                                console.error(err);
                                throw err;
                            }

                        };
                        check.should.not.throw();
                    })
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

                return CoreUtil.chown({path: tempDir.path, recursive: true, uid: 5000, gid: 5000})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function () {


                        TestUtil.walkFileTree(fileTree, function (file, stats) {

                            var check = function () {
                                try {

                                    stats.uid.should.be.equal(5000);
                                    stats.gid.should.be.equal(5000);
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
