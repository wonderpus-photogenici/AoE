const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: path.resolve(__dirname, "src/index.js"), // Corrected path for entry point
  output: {
    path: path.join(__dirname, "/dist"), // Output directory for bundled files
    filename: "bundle.js", // Output filename
  },
  mode: "development",
  // target: "node", // Set target to Node.js
  // externals: [nodeExternals()], // Exclude Node.js native modules and dependencies
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile JS and JSX files using Babel
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: "babel-loader", // Use Babel loader
        },
      },
      {
        test: /\.scss$/, // Transpile SCSS files to CSS
        use: [
          "style-loader", // Injects styles into DOM
          "css-loader", // Interprets @import and url() like import/require()
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // Handle image files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      }
    ],
  },
  devServer: {
    port: 8080, // Port for development server
    hot: true, // Enable live reload
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
  ],
};

 // Corrected path for HTML template