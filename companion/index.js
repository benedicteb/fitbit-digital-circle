import { settingsStorage } from "settings";
import * as messaging from "messaging";

import { debug } from "../common/log.js";

settingsStorage.onchange = evt => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    if (evt.key === "dateFormat") {
      const message = {
        key: evt.key,
        value: JSON.parse(evt.newValue).values[0].format
      };
    }

    debug(`Companion sent: ${JSON.stringify(message, undefined, 2)}`);

    messaging.peerSocket.send(message);
  }
};

const onAppStart = () => {
  // Set default settings if none are set
  if (settingsStorage.getItem("dateFormat") == null) {
    settingsStorage.setItem(
      "dateFormat",
      JSON.stringify({
        selected: [0],
        values: [
          {
            name: "MMMM dd",
            format: "pretty"
          }
        ]
      })
    );
  }
};

onAppStart();
