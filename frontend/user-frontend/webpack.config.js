const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const dotenv = require("dotenv");
const webpack = require("webpack");

dotenv.config({ path: "./.env.user-frontend" });

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "food-store",
    projectName: "user-frontend",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 8000, // Set the port for user-frontend
      historyApiFallback: true, // Optional: useful for single-page applications
    },
    plugins: [
      // Inject environment variables into the frontend code
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ],
  });
};
