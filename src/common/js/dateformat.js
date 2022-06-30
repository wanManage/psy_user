/**
 * Created by Administrator on 2017/5/23.
 */
//转换mysql的datetime日期时间格式
function makeDate(date) {
    try {
        let newDate = new Date(date);
        //在小于10的月份前补0
        let month = eval(newDate.getMonth() + 1) < 10 ? '0'+eval(newDate.getMonth() + 1) : eval(newDate.getMonth() + 1);
        //在小于10的日期前补0
        let day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
        //在小于10的小时前补0
        let hours = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
        //在小于10的分钟前补0
        let minutes = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
        //在小于10的秒数前补0
        let seconds = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds(): newDate.getSeconds();
        //拼接时间
        let stringDate = newDate.getFullYear() + '-' + month + '-' + day + " " + hours + ":" + minutes + ":" + seconds;
        return stringDate;
    }catch(e){
        let stringDate1 = "0000-00-00 00:00:00";
        return stringDate1;
    }

}

function makeSimpleDate(date) {
  try {
    var newDate = new Date(date);
    //在小于10的月份前补0
    var month = eval(newDate.getMonth() + 1) < 10 ? '0'+eval(newDate.getMonth() + 1) : eval(newDate.getMonth() + 1);
    //在小于10的日期前补0
    var day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
   //拼接时间
    var stringDate = newDate.getFullYear() + '-' + month + '-' + day;
    return stringDate;
  }catch(e){
    return "0000-00-00";
  }
}

function getAge(card) {
  var len = card.length;
  if (len == 0) {
      return 0;
  } else {
      if ((len != 15) && (len != 18)) //身份证号码只能为15位或18位其它不合法
      {
          return 0;
      }
  }
  var strBirthday = "";
  if (len == 18) { //处理18位的身份证号码从号码中得到生日和性别代码
      strBirthday = card.substr(6, 4) + "/" + card.substr(10, 2) + "/" + card.substr(12, 2);
  }
  if (len == 15) {
      strBirthday = "19" + card.slice(6,12)
      strBirthday = strBirthday.replace(/(.{4})(.{2})/,"$1/$2/");
  }
  // 时间字符串里，必须是 "/"
  var birthDate = new Date(strBirthday);
  var nowDateTime = new Date();
  var age = nowDateTime.getFullYear() - birthDate.getFullYear();
  // 再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

// 获取生日  
// function getBirth(card) {
//   var len = card.length;
//   //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字  
//   if (len == '15') {
//       var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
//       var arr_data = card.match(re_fifteen);
//       var year = arr_data[2];
//       var month = arr_data[3];
//       var day = arr_data[4];
//       var birthday = new Date('19' + year + '/' + month + '/' + day);
//       return birthday
//   }
//   //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X  
//   if (len == '18') {
//       var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
//       var arr_data = card.match(re_eighteen);
//       var year = arr_data[2];
//       var month = arr_data[3];
//       var day = arr_data[4];
//       var birthday = new Date(year + '/' + month + '/' + day);
//       return birthday
//   }
// }


export{
  makeDate,
  makeSimpleDate,
  getAge
}
