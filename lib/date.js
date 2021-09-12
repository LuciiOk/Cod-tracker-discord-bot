module.exports  = (mss) => {
    let day = 86400;
    let hour = 3600;
    let minute = 60;

    let daysout = Math.floor(mss / day);
    let hoursout = Math.floor((mss - daysout * day)/hour);
    let minutesout = Math.floor((mss - daysout * day - hoursout * hour)/minute);
    return daysout + " días " + hoursout + " horas " + minutesout + " minutos ";
}
