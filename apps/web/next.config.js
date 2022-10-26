const withTM = require("next-transpile-modules")(["ui", "contract"]);

module.exports = withTM({
  reactStrictMode: true,
});
