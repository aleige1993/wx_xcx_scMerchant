
const toDate = str => {
    if (str && typeof str == "string") {
        str = str.replace(/T/g, ' ');
        var isUTC = str.substr(str.length - 1) === 'Z';
        if (isUTC) {
            str = str.substr(0, str.length - 1);
        }
        var index = str.lastIndexOf('.');
        if (index > -1 && str.substring(0, index).indexOf(':') > -1) {//去掉毫秒
            str = str.substring(0, index);
        }
        var reg1 = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/,
            reg2 = /^\/Date\([0-9]\)\/$/g,
            result;
        if (reg1.test(str)) {
            str = str.replace(/-/g, "/");
            result = new Date(str);
        } else if (reg2.test(str)) {
            var dateNum = str.substr(6);
            dateNum = dateNum.substring(0, dateNum.length - 2);
            result = new Date(parseInt(dateNum));
        } else {
            result = new Date(str.replace(/\-/g, "/"));
        }
        if (isUTC) {
            // result = result.addHours(8);
            result.setHours(result.getHours() + 8);
        }
        return result;
    }

    return str;
}

const dateFormat = (date, fmt) => {
    date = toDate(date);

    var w = date.getDay();
    var d = date.getDate();
    var o = {
        "M+": date.getMonth() + 1,                 //月份   
        "d+": d,                                    //日   
        "h+": date.getHours(),                   //小时   
        "m+": date.getMinutes(),                 //分   
        "s+": date.getSeconds(),                 //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "Z": Math.ceil((d + 6 - w) / 7),
        "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

const dateFormatType = (date, type) => {
    var fmt;
    switch (type) {
        case 1: fmt = 'yyyy-MM-dd'; break;
        case 2: fmt = 'yyyy-MM-dd hh:mm'; break;
        case 3: fmt = 'yyyy-MM'; break;
        case 4: fmt = 'MM-dd'; break;
    }
    return dateFormat(date, fmt);
}
// const dateAdd = startDate => {
//     startDate = new Date(startDate);
//     startDate = +startDate + 1000 * 60 * 60 * 24;
//     startDate = new Date(startDate);
//     var nextStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
//     return nextStartDate;
// }
// const dateminus = startDate => {
//     startDate = new Date(startDate);
//     startDate = + startDate - (1000 * 60 * 60 * 24);
//     startDate = new Date(startDate);
//     var nextStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
//     return nextStartDate;
// }

//在某个日期上加/减几天、周、月、年
const dateAdd = (datepart, num, date, fmt) => {
    date = toDate(date);
    switch (datepart) {
        case "dd"://天
            date.setDate(date.getDate() + num);
            break;
        case "week"://周
            date.setDate(date.getDate() + num * 7);
            break;
        case "mm"://月
            date.setMonth(date.getMonth() + num);
            break;
        case "yy"://年
            date.setFullYear(date.getFullYear() + num);
            break;
    }
    return dateFormat(date, fmt);
}

//当前日期是本月第几周
const getMonthWeek = (date) => {
    date = toDate(date);
    var w = date.getDay(), d = date.getDate();
    return Math.ceil(
        (d + 6 - w) / 7
    );
}

//当前日期是本年第几周
const getYearWeek = (date) => {
    date = toDate(date);
    var date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1),
        d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
    return Math.ceil(
        (d + ((date2.getDay() + 1) - 1)) / 7
    );
}

//获取时间区间
const getTimeSection = (datetype, fmt) => {
    var nowdate = new Date();
    var sdate = new Date(), edate = new Date();
    var resultdate={
        sdate:"",
        edate:""
    };
    switch (datetype) {
        case 1://本日
            resultdate.sdate = dateFormat(nowdate,fmt);
            resultdate.edate = dateFormat(nowdate, fmt);
            break;
        case 2://本月
            sdate.setDate(1);
            resultdate.sdate = dateFormat(sdate, fmt);
            resultdate.edate = dateFormat(nowdate, fmt);
            break;
        case 3://上月
            sdate.setMonth(sdate.getMonth()-1);
            sdate.setDate(1);
            resultdate.sdate = dateFormat(sdate, fmt);
            var days = getDaysInMonth(sdate.getFullYear(), edate.getMonth());
            sdate.setDate(days);
            resultdate.edate = dateFormat(sdate, fmt);
            break;
        case 4://本年
            sdate.setDate(1);
            sdate.setMonth(0);
            resultdate.sdate = dateFormat(sdate, fmt);
            resultdate.edate = dateFormat(edate, fmt);
    }
    return resultdate;
}

//获取一个月最多有多少天
const getDaysInMonth=(year, month)=> {
    var d = new Date(year, month, 0);
    return d.getDate();
}

//计算过期时间
const pastDue = (startTime, endTime)=>{
    var endTime = new Date(endTime);
    var startTime = new Date(startTime);
    var divTime = endTime.getTime() - startTime.getTime();
    var result = Math.floor(divTime / 1000);
    if (result < 60) {
        return { num: result, unit: '秒' };
    }
    if (result = Math.floor(result / 60), result < 60) {
        return { num: result, unit: '分' };
    }
    if (result = Math.floor(result / 60), result < 24) {
        return { num: result, unit: '小时' };
    }
    if (result = Math.floor(result / 24), result < 30) {
        return { num: result, unit: '天' };
    }
    return { num: Math.floor(result / 30), unit: '月' };
}
const validStr=(val)=>{
    if (isNull(val) || typeof val !== "string" || val.trim().length == 0) return false;
    return true;
}
const isNull=(obj)=>{
    return obj === null || obj == undefined;
}
//验证码
const  VerifCode = (that, verifCode, tiemNum) => {
  that.setData({
      [verifCode]: false
  });
  var interval = setInterval(function () {
    tiemNum--;
    that.setData({
      tiemNum: tiemNum
    })
    if (tiemNum < 1) {
      clearInterval(interval);
      that.setData({
          [verifCode]: true,
          tiemNum: tiemNum
      })
    }
  }, 1000)
}  

module.exports = {
    dateFormat: dateFormat,
    dateFormatType: dateFormatType,
    dateAdd: dateAdd,
    // dateminus: dateminus,
    getMonthWeek: getMonthWeek,
    getYearWeek: getYearWeek,
    getTimeSection: getTimeSection,//获取时间区间
    pastDue: pastDue,
    validStr: validStr,
    VerifCode: VerifCode
}
