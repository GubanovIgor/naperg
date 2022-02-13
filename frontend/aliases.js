const path = require('path');

const relativeAliases = [
  ['@', './src/'],
	['@styles', './styles/']
];

const absoluteAliases = {};
relativeAliases.map((alias) => {
  absoluteAliases[alias[0]] = path.resolve(__dirname, alias[1]);
  return null;
});

module.exports.relativeAliases = relativeAliases;
module.exports.absoluteAliases = absoluteAliases;
