import { readFileSync, writeFileSync, statSync } from "fs";

import { debug } from "../common/log.js";

import config from "../config.js";

const readLocalStorage = () => {
  const filename = config.localStorageFile;

  try {
    statSync(filename);
  } catch (error) {
    debug(`Error reading storage file: ${error}`);
    return {};
  }

  const localStorage = readFileSync(filename, "json");

  debug(`Local storage fetched: ${JSON.stringify(localStorage, undefined, 2)}`);

  return localStorage;
};

const writeLocalStorage = localStorage => {
  const filename = config.localStorageFile;

  writeFileSync(filename, localStorage, "json");

  debug(`Local storage written: ${JSON.stringify(localStorage, undefined, 2)}`);
};

export { readLocalStorage, writeLocalStorage };
