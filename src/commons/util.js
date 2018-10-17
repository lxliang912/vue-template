const httpRequest = {
  // 下载Excel表格
  getFileData(that, exportname, urlInfo, callback) {
    that.axios
      .get(urlInfo, {
        responseType: 'blob',
        headers: {
          Authorization: "Bearer " +
            that.$utils.getStorage("loginData").accessToken
        }
      })
      .then(response => {
        if (!this.isEmpty(response)) {
          this.downloadFile(response.data, exportname, 'xlsx');
          callback(response);
        }
      })
      .catch(res => {
        callback(res.response);
      });
  },
  downloadFile(downname, exportname, format) {
    const blob = new Blob([downname]);
    const fileName = exportname + "." + format;
    if ('download' in document.createElement('a')) { // 非IE下载
      const elink = document.createElement('a');
      elink.download = fileName;
      elink.style.display = 'none';
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(
        elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    } else { // IE10+下载
      navigator.msSaveBlob(blob, fileName);
    }
  },
  // http get请求
  httpGet(that, requestData, callback) {
    that.axios
      .get(requestData.url, {
        headers: {
          Authorization: "Bearer " + that.$utils.getStorage("loginData").accessToken
        }
      })
      .then(response => {
        callback(response);
      })
      .catch(res => {
        callback(res.response);
      });
  },
  // http put请求
  httpPut(that, requestData, callback) {
    that.axios({
        method: "put",
        url: requestData.url,
        data: requestData.data,
        headers: {
          'Content-type': 'application/json',
          Authorization: "Bearer " + that.$utils.getStorage("loginData").accessToken
        }
      })
      .then(response => {
        callback(response);
      })
      .catch(res => {
        callback(res.response);
      });
  },
  // http post请求
  httpPost(that, requestData, callback) {
    that.axios({
        method: "post",
        url: requestData.url,
        data: requestData.data,
        headers: {
          'Content-type': 'application/json',
          Authorization: "Bearer " + that.$utils.getStorage("loginData").accessToken
        }
      })
      .then(response => {
        callback(response);
      })
      .catch(res => {
        callback(res.response);
      });
  },
  // http delete请求
  httpDelete(that, requestData, callback) {
    that.axios({
        method: "delete",
        url: requestData.url,
        data: requestData.data,
        headers: {
          Authorization: "Bearer " + that.$utils.getStorage("loginData").accessToken
        }
      })
      .then(response => {
        callback(response);
      })
      .catch(res => {
        callback(res.response);
      });
  },
}

const apiManager = {
  originAPI: 'http://pubdata.sjgo58.com/api/',
  getApi(name) {
    switch (name) {
      case 'loginApi':
        return this.originAPI + 'TokenAuth/Authenticate';
      default:
        break;
    }
  }
}

export {
  httpRequest,
  apiManager,
}
