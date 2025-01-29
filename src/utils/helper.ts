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