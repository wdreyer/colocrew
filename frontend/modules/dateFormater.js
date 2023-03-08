function dateFormater (date) {
    const maDate = new Date(date);
    const day = maDate.getDate().toString().padStart(2, '0');
    const month = (maDate.getMonth() + 1).toString().padStart(2, '0');
    const year = maDate.getFullYear().toString();
    const formattedDate = day + '/' + month + '/' + year;
    return(formattedDate);
  } 

  module.exports = { dateFormater };