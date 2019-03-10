import clock from "clock";
import document from "document";
import { display } from "display";
import { preferences } from "user-settings";
import { today, goals } from "user-activity";
import { HeartRateSensor } from "heart-rate";

import { padNumber } from "../common/utils";
import getMonthShortName from "../common/getMonthShortName.js";
import { debug } from "../common/log.js";

import getWeekdayName from "./getWeekdayName";
import getWeekNumber from "./getWeekNumber";
import { initMessaging } from "./communication";
import { readLocalStorage } from "./localStorage";

const HR_MONITOR = new HeartRateSensor();

const lastHrReading = 0;

const fillMarkerCircle = factor => {
  const elements = document.getElementsByClassName("marker");
  const totalElements = elements.length;
  const noToFill = Math.floor(totalElements * factor);

  for (const i = 0; i < totalElements; i++) {
    const element = elements[i];

    if (i <= noToFill) {
      element.style.fill = "#7FFF00";
    } else {
      element.style.fill = "#26380c";
    }
  }
};

const initClock = localStorage => {
  // Update the clock every minute
  clock.granularity = "seconds";

  const txtTime = document.getElementById("txt-time");
  const txtDate = document.getElementById("txt-date");
  const txtWeek = document.getElementById("txt-week");
  const txtSteps = document.getElementById("txt-steps");

  // Update the <text> element every tick with the current time
  clock.ontick = evt => {
    const now = evt.date;
    const steps = today.local.steps;
    const stepGoal = goals.steps;

    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const date = now.getDate();
    const month = now.getMonth();
    const weekNumber = getWeekNumber(now);
    const dayName = getWeekdayName(now.getDay());

    txtTime.text = `${padNumber(hours)}:${padNumber(minutes)}`;
    txtWeek.text = `${dayName} ${weekNumber}`;
    txtSteps.text = steps;

    if ("dateFormat" in localStorage) {
      if (localStorage.dateFormat === "utc") {
        txtDate.text = `${year}-${padNumber(month + 1)}-${padNumber(date)}`;
      } else {
        txtDate.text = `${getMonthShortName(month)} ${date}`;
      }
    } else {
      txtDate.text = `${getMonthShortName(month)} ${date}`;
    }

    fillMarkerCircle(seconds / 60.0);
  };
};

const initDisplay = (onWake, onSleep) => {
  display.addEventListener("change", () => {
    if (display.on) {
      debug("Starting HR monitor");
      HR_MONITOR.start();
    } else {
      debug("Stopping HR monitor");
      HR_MONITOR.stop();
    }
  });
};

const initHr = () => {
  const txtHr = document.getElementById("txt-hr");

  HR_MONITOR.onreading = () => {
    const timestamp = HR_MONITOR.timestamp;

    if (timestamp === lastHrReading) {
      const heartRate = "--";
    } else {
      const heartRate = HR_MONITOR.heartRate;
    }

    debug(`Heart rate: ${heartRate}`);
    txtHr.text = heartRate;

    lastHrReading = timestamp;
  };

  HR_MONITOR.start();
};

const localStorage = readLocalStorage();

initMessaging(localStorage);
initDisplay();
initClock(localStorage);
initHr();
