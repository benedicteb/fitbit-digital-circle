import * as messaging from "messaging";

import { debug, error } from "../common/log.js";

import { writeLocalStorage } from "localStorage";

const initMessaging = localStorage => {
  messaging.peerSocket.onmessage = evt => {
    debug(`App received: ${JSON.stringify(evt, undefined, 2)}`);

    if (evt.data.key === "dateFormat" && "value" in evt.data) {
      localStorage.dateFormat = evt.data.value;
      writeLocalStorage(localStorage);
    }
  };
};

export { initMessaging };
