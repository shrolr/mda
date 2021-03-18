var dayjs = require('dayjs')

const convertUTCDateToLocalDate = (date:Date) => {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);
    let _date = dayjs(newDate).hour(hours).format("DD-MM-YYYY")
    let time = dayjs(newDate).hour(hours).format("HH-mm-ss")
    
    return {date:_date,time}
}

export { convertUTCDateToLocalDate}