const GlobalFunctions = {
  returnFirstLetter: function firstLetterString(inputString) {
    return inputString ? inputString[0] : "";
  },

  returnConvertedDate: function convertDateStringToDate(dateString) {
    // Create a new Date object from the provided date string
    let date = new Date(dateString);

    // Extract year, month, and day
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Month is zero-indexed, so adding 1
    let day = date.getDate();

    // Format month and day to ensure they have leading zeros if necessary
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    // Construct the formatted date string
    let formattedDate = day + "/" + month + "/" + year;

    return formattedDate;
  },

  returnRandomColor: function getColor(input) {
    const colors = {
      a: "#F9B5B5",
      b: "#FAD8B5",
      c: "#C3E4B5",
      d: "#A9CFE8",
      e: "#A2B7F6",
      f: "#ADC8E6",
      g: "#C3E4B5",
      h: "#E2B8C6",
      i: "#F7B7B7",
      j: "#F9B5B5",
      k: "#FAD8B5",
      l: "#C3E4B5",
      m: "#A9CFE8",
      n: "#A2B7F6",
      o: "#ADC8E6",
      p: "#C3E4B5",
      q: "#E2B8C6",
      r: "#F7B7B7",
      s: "#F9B5B5",
      t: "#FAD8B5",
      u: "#C3E4B5",
      v: "#A9CFE8",
      w: "#A2B7F6",
      x: "#ADC8E6",
      y: "#E2B8C6",
      z: "#F7B7B7",
      0: "#F9B5B5",
      1: "#FAD8B5",
      2: "#C3E4B5",
      3: "#A9CFE8",
      4: "#A2B7F6",
      5: "#ADC8E6",
      6: "#C3E4B5",
      7: "#E2B8C6",
      8: "#F7B7B7",
      9: "#F9B5B5",
    };

    return colors[input.toLowerCase()];
  },
};

export default GlobalFunctions;
