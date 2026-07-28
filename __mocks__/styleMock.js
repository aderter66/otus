const styles = new Proxy(
  {},
  {
    get: (_, prop) => String(prop),
  },
);

module.exports = styles;
module.exports.default = styles;
