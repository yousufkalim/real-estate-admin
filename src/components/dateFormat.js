export const titleCase = (str) => {
  var splitStr = str.toString().toLowerCase().split(' ');

  for (var i = 0; i < splitStr.length; i++) {
    // Assigning it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  var split = splitStr[0].substring(0, 3) + ' ' + splitStr[1] + ' ' + splitStr[2].substring(0, 3) + ' ' + splitStr[3];
  // Returning the joined string
  return split;
};
