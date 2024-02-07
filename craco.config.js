const CracoAlias = require("craco-alias");

module.exports = {
  devServer: {
    port: 3100,
  },

  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "jsconfig",
        // jsConfigPath: "jsconfig.paths.json",
      },
    },
    // {
    //   plugin: require("./CracoFederationPlugin"),
    //   options: { useNamedChunkIds: true },
    // },
  ],
};
