const { exec } = require("child_process");
const util = require("util");

const asyncExec = util.promisify(exec);

module.exports = {
  getUsername: async () => {
    const username = await asyncExec("id -un");
    return (
      username.stdout.charAt(0).toUpperCase() +
      username.stdout.slice(1).trimEnd()
    );
  },
};
