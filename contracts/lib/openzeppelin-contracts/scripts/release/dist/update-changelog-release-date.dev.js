#!/usr/bin/env node
// Sets the release date of the current release in the changelog.
// This is run automatically when npm version is run.
"use strict";

var fs = require('fs');

var cp = require('child_process');

var suffix = process.env.PRERELEASE_SUFFIX || 'rc';
var changelog = fs.readFileSync('CHANGELOG.md', 'utf8'); // The changelog entry to be updated looks like this:
// ## Unreleased
// We need to add the version and release date in a YYYY-MM-DD format, so that it looks like this:
// ## 2.5.3 (2019-04-25)

var pkg = require('../../package.json');

var version = pkg.version.replace(new RegExp('-' + suffix + '\\..*'), '');
var header = new RegExp("^## (Unreleased|".concat(version, ")$"), 'm');

if (!header.test(changelog)) {
  console.error('Missing changelog entry');
  process.exit(1);
}

var newHeader = pkg.version.indexOf(suffix) === -1 ? "## ".concat(version, " (").concat(new Date().toISOString().split('T')[0], ")") : "## ".concat(version);
fs.writeFileSync('CHANGELOG.md', changelog.replace(header, newHeader));
cp.execSync('git add CHANGELOG.md', {
  stdio: 'inherit'
});