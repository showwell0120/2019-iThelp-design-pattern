const path = require("path");
const { lstatSync, readdirSync } = require("fs");

const basePath = path.resolve(__dirname, "../", "packages");
const packages = readdirSync(basePath).filter(name =>
  lstatSync(path.join(basePath, name)).isDirectory()
);

module.exports = ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      loader: require.resolve("awesome-typescript-loader"),
      include: path.resolve(__dirname, "../")
    },
    {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../")
    },
    {
      test: /\.less$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "less-loader", options: { javascriptEnabled: true } }
      ],
      include: path.resolve(__dirname, "../")
    }
  );
  config.resolve.extensions.push(".ts", ".tsx");
  config.plugins.push();
  Object.assign(config.resolve.alias, {
    ...packages.reduce(
      (acc, name) => ({
        ...acc,
        [`@Design-Pattern-Typescript-React/${name}`]: path.join(basePath, name, "src")
      }),
      {}
    )
  });

  return config;
};
