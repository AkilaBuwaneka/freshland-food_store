const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const dotenv = require("dotenv");
const webpack = require("webpack");

dotenv.config({ path: "./.env.cart-frontend" });

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "food-store",
    projectName: "cart-frontend",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 8003, // Set the port for cart-frontend
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
