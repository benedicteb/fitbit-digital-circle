import config from "../config.json";

const debug = message => {
  if (config.debug) {
    console.log(message);
  }
};

export { debug };
