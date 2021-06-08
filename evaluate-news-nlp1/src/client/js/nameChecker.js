function checkForName(inputText) {
  const re = new RegExp(/^(http|https):\/\/[^ "]+$/);
   return re.test(url);
}

export default checkForName

    // console.log("::: Running checkForName :::", inputText);
    // let names = [
    //     "Picard",
    //     "Janeway",
    //     "Kirk",
    //     "Archer",
    //     "Georgiou"
    // ]
    //
    // if(names.includes(inputText)) {
    //     alert("Welcome, Captain!")
    // }
