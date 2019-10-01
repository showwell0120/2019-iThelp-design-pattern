module.exports = api => {
  api.cache(true);

  return {
    plugins: [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ],
    presets: [
      [
        "@babel/env",
        {
          targets: {
            browsers: "Last 2 Chrome versions, Firefox ESR",
            node: "current"
          }
        }
      ],
      [
        "@babel/preset-react",
        {
          development: process.env.BABEL_ENV !== "build"
        }
      ],
      "@babel/preset-typescript"
    ],
    env: {
      build: {
        ignore: [
          "**/*.test.tsx",
          "**/*.test.ts",
          "**/*.story.tsx",
          "__snapshots__",
          "__tests__",
          "__stories__"
        ]
      }
    },
    ignore: ["node_modules"]
  };
};
