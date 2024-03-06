const { datesToBeScheduled } = require("./Helper/schedulingAlgorithm.helper");

// fake data
/*exports.datesToBeScheduled = async (
  judgeSchedule,
  lawyersSchedule,
  dateToStartChecking
) => {
  // assuming half an hour for each case
  // court start time is 9:00 AM
  // court end time is 5:00 PM
  // lunch break is from 1:00 PM to 1:30 PM
  // court can handle 10 cases per day
  // court is closed on Saturday and Sunday

  // now run the loop until we get 10 dates to schedule a case
  let dates = [];
  let date = dateToStartChecking;
  let day = date.getDay();
  let time = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let milliseconds = date.getMilliseconds();
  let dayCounter = 0;
  let dateCounter = 0;
  // start iterating over the dates and time and check if the judge and lawyers are available
  while (dates.length < 10) {
    // if the day is not Saturday or Sunday
    if (day != 6 && day != 0) {
      // if the time is not 1:00 PM to 1:30 PM
      if (time >= 13 && time < 13.5) {
        // if the judge is available
        if (judgeSchedule[dateCounter] == null) {
          // if the lawyers are available
          let isLawyersAvailable = true;
          for (let i = 0; i < lawyersSchedule.length; i++) {
            if (lawyersSchedule[i][dateCounter] != null) {
              isLawyersAvailable = false;
              break;
            }
          }
          if (isLawyersAvailable) {
            dates.push(date);
            dateCounter++;
          }
        }
      } else if (time == 13) {
        // if the time is 1:00 PM
        // increment the date by 30 minutes
        date = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          time,
          minutes,
          seconds,
          milliseconds
        );
        date.setMinutes(date.getMinutes() + 30);
        time = date.getHours();
        minutes = date.getMinutes();
        seconds = date.getSeconds();
        milliseconds = date.getMilliseconds();
        day = date.getDay();
      } else {
        // move the date to the next day and reset the time to 9:00 AM
        date = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          time,
          minutes,
          seconds,
          milliseconds
        );
        date.setDate(date.getDate() + 1);
        date.setHours(9);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        time = date.getHours();
        minutes = date.getMinutes();
        seconds = date.getSeconds();
        milliseconds = date.getMilliseconds();
        day = date.getDay();
      }
    } else {
      // if the day is Saturday or Sunday
      // increment the date by 1 day
      date = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time,
        minutes,
        seconds,
        milliseconds
      );
      date.setDate(date.getDate() + 1);
      time = date.getHours();
      minutes = date.getMinutes();
      seconds = date.getSeconds();
      milliseconds = date.getMilliseconds();
      day = date.getDay();
    }
    // increment the date by 30 minutes
    date = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time,
      minutes,
      seconds,
      milliseconds
    );
    date.setMinutes(date.getMinutes() + 30);
    time = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    milliseconds = date.getMilliseconds();
    day = date.getDay();
  }

  return dates;
};
*/
// fake data
const judgeSchedule = [
  "2022-01-03T03:30:00.000Z",
  "2022-01-03T04:00:00.000Z",
  "2022-01-03T04:30:00.000Z",
  "2022-01-03T05:00:00.000Z",
  "2022-01-03T05:30:00.000Z",
  "2022-01-03T06:00:00.000Z",
  "2022-01-03T06:30:00.000Z",
  "2022-01-03T07:00:00.000Z",
  "2022-01-03T08:00:00.000Z",
  "2022-01-03T08:30:00.000Z",
];
console.log(judgeSchedule.includes("2022-01-03T03:30:00.000Z"));
const lawyersSchedule = [[null], [null]];

const dateToStartChecking = new Date("2022-01-03T09:00:00.000Z");

const result = datesToBeScheduled(
  judgeSchedule,
  lawyersSchedule,
  dateToStartChecking
);
// show in date and time format
result.forEach((date) => console.log(date.toString()));
console.log(result);
