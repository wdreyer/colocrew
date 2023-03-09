function dateFormater(date) {
  const maDate = new Date(date);
  const day = maDate.getDate().toString().padStart(2, "0");
  const month = (maDate.getMonth() + 1).toString().padStart(2, "0");
  const year = maDate.getFullYear().toString();
  const formattedDate = day + "/" + month + "/" + year;
  return formattedDate;
}
 


function shittyDateFormater(date) {
  const reFormatDate = date.split("/").join("-") + "T02:00:00.000+00:00";
  console.log(reFormatDate);
  const maDate = new Date(reFormatDate);
  const day = maDate.getDate().toString().padStart(2, "0");
  const month = (maDate.getMonth() + 1).toString().padStart(2, "0");
  const year = maDate.getFullYear().toString();
  const formattedDate = day + "/" + month + "/" + year;
  return formattedDate;
}

module.exports = { dateFormater, shittyDateFormater };
