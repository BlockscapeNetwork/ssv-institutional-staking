"use strict";

var path = require('path');

var fs = require('fs');
/** @type import('solidity-docgen/dist/config').UserConfig */


module.exports = {
  outputDir: 'docs/modules/api/pages',
  templates: 'docs/templates',
  exclude: ['mocks'],
  pageExtension: '.adoc',
  pages: function pages(_, file, config) {
    // For each contract file, find the closest README.adoc and return its location as the output page path.
    var sourcesDir = path.resolve(config.root, config.sourcesDir);
    var dir = path.resolve(config.root, file.absolutePath);

    while (dir.startsWith(sourcesDir)) {
      dir = path.dirname(dir);

      if (fs.existsSync(path.join(dir, 'README.adoc'))) {
        return path.relative(sourcesDir, dir) + config.pageExtension;
      }
    }
  }
};