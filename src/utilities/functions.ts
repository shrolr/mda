const convertUTCDateToLocalDate = (date:Date) => {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);
    console.log(hours , offset)
    return new Date(newDate.toString())
}

export { convertUTCDateToLocalDate}