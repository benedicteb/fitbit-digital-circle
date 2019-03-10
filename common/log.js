import config from "../config.js";

const debug = message => {
  if (config.debug) {
    console.log(message);
  }
};

export { debug };
