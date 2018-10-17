export default {
  install: function(Vue) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {};

    // 2. 添加全局资源
    // 格式化日期，参数formatType为需要输出的格式，如：yyyy-MM-dd，根据对象o包含属性定义
    Vue.filter('formatTime', (curTime, formatType) => {
      let o = {
        "M+": curTime.getMonth() + 1, //month
        "d+": curTime.getDate(), //day
        "h+": curTime.getHours(), //hour
        "m+": curTime.getMinutes(), //minute
        "s+": curTime.getSeconds(), //second
        "q+": Math.floor((curTime.getMonth() + 3) / 3), //quarter
        "S": curTime.getMilliseconds() //millisecond
      };

      if (/(y+)/.test(formatType)) {
        formatType = formatType.replace(RegExp.$1, (curTime.getFullYear() + "").substr(4 - RegExp.$1.length));
      }

      for (let k in o) {
        if (new RegExp("(" + k + ")").test(formatType)) {
          formatType = formatType.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }

      return formatType;
    });

    // 3. 注入组件
    Vue.mixin({
      created() {
        // console.log("组件开始加载")
      }
    });

    // 4. 添加实例方法
    // 工具组件，包含常用方法
    Vue.prototype.$utils = {
      // 判断对象是否为空
      isEmpty(value) {
        if (value === "" || value === undefined || value === null) {
          return true;
        } else {
          return false;
        }
      },
      //电话号码合法性检查
      checkTelephone(tel) {
        let pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
        return pattern.test(tel)
      },
      // localStorage 缓存管理
      setStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
      },
      getStorage(key) {
        return JSON.parse(localStorage.getItem(key));
      },
      clearStorage() {
        localStorage.clear();
      },
      removeStorage(key) {
        localStorage.removeItem(key);
      },
    };
  }
}
