exports.datesToBeScheduled = (
  judgeScheduleCopy,
  lawyersScheduleCopy,
  dateToStartChecking
) => {
  let judgeSchedule = [];
  for (let i = 0; i < judgeScheduleCopy.length; i++) {
    judgeSchedule.push(new Date(judgeScheduleCopy[i].dateTime).getTime());
  }
  let lawyersSchedule = [];
  for (let i = 0; i < lawyersScheduleCopy.length; i++) {
    let temp = [];
    for (let j = 0; j < lawyersScheduleCopy[i].length; j++) {
      temp.push(new Date(lawyersScheduleCopy[i][j].dateTime).getTime());
    }
    lawyersSchedule.push(temp);
  }
  let dates = [];
  let date = new Date(dateToStartChecking);
  // set time to 9:00 AM
  date.setHours(9);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  let day = date.getDay();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let milliseconds = date.getMilliseconds();
  while (dates.length < 10) {
    if (day != 6 && day != 0) {
      if (!((hour == 13 && minutes == 0) || hour >= 17 || hour < 9)) {
        if (!judgeSchedule.includes(date.getTime())) {
          let isLawyersAvailable = true;
          for (let i = 0; i < lawyersSchedule.length; i++) {
            if (lawyersSchedule[i].includes(date.getTime())) {
              isLawyersAvailable = false;
              break;
            }
          }
          if (isLawyersAvailable) {
            dates.push(date);
          }
        }
        date = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hour,
          minutes,
          seconds,
          milliseconds
        );
        date.setMinutes(date.getMinutes() + 30);
        hour = date.getHours();
        minutes = date.getMinutes();
        seconds = date.getSeconds();
        milliseconds = date.getMilliseconds();
        day = date.getDay();
      } else if (hour == 13 && minutes == 0) {
        date = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hour,
          minutes,
          seconds,
          milliseconds
        );
        date.setMinutes(date.getMinutes() + 30);
        hour = date.getHours();
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
          hour,
          minutes,
          seconds,
          milliseconds
        );
        date.setDate(date.getDate() + 1);
        date.setHours(9);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        hour = date.getHours();
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
        hour,
        minutes,
        seconds,
        milliseconds
      );
      date.setDate(date.getDate() + 1);
      hour = date.getHours();
      minutes = date.getMinutes();
      seconds = date.getSeconds();
      milliseconds = date.getMilliseconds();
      day = date.getDay();
    }
  }

  return dates;
};

exports.checkGivenDate = (
  dateGiven,
  judgeSchedule,
  lawyersSchedule,
  dateStarted
) => {
  const dateOptionArray = this.datesToBeScheduled(
    judgeSchedule,
    lawyersSchedule,
    dateStarted
  );

  for (let i = 0; i < dateOptionArray.length; i++) {
    if (
      new Date(dateOptionArray[i]).getTime() == new Date(dateGiven).getTime()
    ) {
      return true;
    }
  }
  return false;
};
