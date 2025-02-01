export const uuid = () => {
    let dt = new Date().getTime();
  
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      },
    );
};


export const applyBgColor = (mode: string): string => {
  const bgColorMap: { [key: string]: string } = {
      info: "90D7FF",
      success: "09BC8A",
      danger: "FF2C55",
      warning: "FCEC52"
  };

  return bgColorMap[mode] || bgColorMap["info"];
};


export const seprateWords = (inputString:string)=>{
  if(inputString.includes("-")){
      return inputString.split("-")
  } else {
    return {inputString}
  }
};







// progress: Represents the progress bar width (from 100% → 0%).
// remainingTime: Stores how much time is left before the toast disappears.
// paused: Tracks whether the user is hovering over the toast.
// timerRef: Stores the timeout reference for auto-removal.
// startTimeRef: Saves the starting time to calculate elapsed time.


// Resets paused = false.
// Calls startTimer(remainingTime), which restarts the timeout using the saved remainingTime.
// Example Flow:

// If autoCloseDuration = 5000ms
// User hovers at 2000ms, remaining time = 3000ms
// User leaves at 2500ms, restart timer for 3000ms (not resetting to 5000ms)