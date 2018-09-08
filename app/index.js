import clock from "clock";
import document from "document";
import { display } from "display";
import { preferences } from "user-settings";
import { today, goals } from "user-activity";
import { HeartRateSensor } from "heart-rate";

import { padNumber } from "../common/utils";

import getMonthShortName from "getMonthShortName";
import getWeekdayName from "getWeekdayName";
import getWeekNumber from "getWeekNumber";

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

const initClock = () => {
  // Update the clock every minute
  clock.granularity = "seconds";

  const txtTime = document.getElementById("txt-time");
  const txtDate = document.getElementById("txt-date");
  const txtWeek = document.getElementById("txt-week");
  const txtWeekday = document.getElementById("txt-weekday");
  const txtSteps = document.getElementById("txt-steps");

  // Update the <text> element every tick with the current time
  clock.ontick = evt => {
    const now = evt.date;
    const steps = today.local.steps;
    const stepGoal = goals.steps;

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const date = now.getDate();
    const month = now.getMonth();
    const weekNumber = getWeekNumber(now);
    const dayName = getWeekdayName(now.getDay());

    txtTime.text = `${padNumber(hours)}:${padNumber(minutes)}`;
    txtDate.text = `${getMonthShortName(month)} ${date}`;
    txtWeek.text = `Wk ${weekNumber}`;
    txtWeekday.text = dayName;
    txtSteps.text = steps;

    fillMarkerCircle(seconds / 60.0);
  };
};

const initDisplay = (onWake, onSleep) => {
  display.addEventListener("change", () => {
    if (display.on) {
      console.log("Starting HR monitor");
      HR_MONITOR.start();
    } else {
      console.log("Stopping HR monitor");
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

    console.log(`Heart rate: ${heartRate}`);
    txtHr.text = heartRate;

    lastHrReading = timestamp;
  };

  HR_MONITOR.start();
};

initDisplay();
initClock();
initHr();
