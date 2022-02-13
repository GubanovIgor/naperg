const aliases = require('./aliases');

module.exports = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliases.absoluteAliases,
    };
    return config;
  },
};
