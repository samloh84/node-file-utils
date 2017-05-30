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

    describe("mkdir()", function () {

        describe("on a path", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                variables.tempDirToMkdir = _path.resolve(tempDir.path, TestUtil.random.getString(10));

            });

            it("should create a directory", function () {
                var variables = this;
                var tempDir = variables.tempDir;
                var tempDirToMkdir = variables.tempDirToMkdir;

                return CoreUtil.mkdir({path: tempDirToMkdir})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function () {
                        var stats = fs.statSync(tempDirToMkdir);

                        stats.isDirectory().should.be.true;

                    });

            });
        });

        describe("on a path with parents", function () {
            beforeEach(function () {
                var variables = this;
                var tempDir = variables.tempDir;
                variables.tempDirToMkdir = _path.resolve(tempDir.path, TestUtil.random.getString(10), TestUtil.random.getString(10), TestUtil.random.getString(10));

            });

            it("should create a directory", function () {
                var variables = this;
                var tempDirToMkdir = variables.tempDirToMkdir;

                return CoreUtil.mkdir({path: tempDirToMkdir, parents: true})
                    .catch(function (err) {
                        console.error(err);
                        throw err;
                    })
                    .should.be.fulfilled
                    .then(function () {
                        var stats = fs.statSync(tempDirToMkdir);

                        stats.isDirectory().should.be.true;

                    });

            });
        })


    });

});
