export const logging = (funcName, event) => {
  console.log(`Run ${funcName} function`);
  if (event){
    console.log(" -->Input parameters: ", event);
  }else{
    console.log(" -->No input parameters");
  }
}
