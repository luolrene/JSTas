var base64Data =
  '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';
var readerPrintData = new FileReader();
var readerPrinterInfo = new FileReader();
var strPrintData;
var strPrinterInfo;
var allPrinters;
let number = 0;
var pageIndex = 1;

// websocket
var g_websocket;

/* // 响应数据 */
var ackJsonData;

var MessageList = {};

// 初始打印服务
export function initprint() {
  // 初始化打印服务
  getInstance();
  // 初始化参数
  var initSdkParam = {
    'fontDir': ''
  };
  // 初始化绘制打印接口
  initSdk(initSdkParam);
}
// 获取打印机
export function getAllPrintersApi(that) {
  let selectData = []
  that.selectList = []
  getAllPrinters(data => {
    var arrParse = JSON.parse(JSON.stringify(data));
    if (isJSON(arrParse.resultAck.info)) {
      var allPrinters = JSON.parse(arrParse.resultAck.info)
      var allPrintersName = Object.keys(allPrinters);
      var allPrintersValue = Object.values(allPrinters);

      allPrintersValue.forEach((xdd, index) => {
        that.selectList.push({
          id: xdd,
          name: allPrintersName[index]
        })
      })
    }
  });
  return selectData
}
export function InitDrawingBoardApi() {
  // 画布参数
  var InitDrawingBoardParam = {
    'width': 49, // 画布宽度
    'height': 58, // 画布高度
    'rotate': 360, // 画布旋转角度
    'path': 'ZT001.ttf', // 字体
    'verticalShift': 0, // 纵向偏移
    'HorizontalShift': 0 // 横向偏移
  };
  InitDrawingBoard(InitDrawingBoardParam);
}
export function closPrint() {
  unInitPrintInstance();
}
// 设定打印机
export function selectPrinterApi(pname = null, pid = 0) {
  initSdk({
    'fontDir': ''
  })
  selectPrinter(pname, parseInt(pid));
}
/**
 * 开始打印
 * @param {json}   datas   打印数据
 * @param {number} page    总页数
 * @param {number} quantc  每页份数
 */
export function prints(datas = null, page = 0, quantc = 1, that) {
  // 画布参数
  number = 0
  var InitDrawingBoardParam = {
    'width': 58, // 画布宽度
    'height': 47, // 画布高度
    'rotate': 360, // 画布旋转角度
    'path': 'ZT001.ttf', // 字体
    'verticalShift': 0, // 纵向偏移
    'HorizontalShift': 0 // 横向偏移
  };
  //  绘制画布
  InitDrawingBoard(InitDrawingBoardParam, function() {
    console.log(datas[number]);
    // 一维码参数
    var DrawLableBarCodeParam = {
      'x': 0.5,
      'y': 38.5,
      'height': 10,
      'width': 57,
      'value': datas[number].sampNo,
      'codeType': 20,
      'rotate': 0,
      'fontSize': 2,
      'textHeight': 0,
      'textPosition': 2
    };

    // 一维码绘制
    DrawLableBarCode(DrawLableBarCodeParam);

    // 文本参数
    var DrawLableTextParam = {
      'x': 0.5, // 横向  上
      'y': 0.5, // 纵向   横
      'height': 47,
      'width': 58,
      'value': '样品编号:' + datas[number].sampNo + '\r\n' +
        '检测项目:' + datas[number].targetName + '\r\n' +
        '保存方式:' + '',
      //  "保存方式:" + datas[number].savetype,
      'fontFamily': '宋体',
      'rotate': 0, // 垂直 对⻬⽅式：0:顶对⻬ 1:垂直居中 2:底对⻬
      'fontSize': 3.0, // 字体⼤⼩，单位mm
      'textAlignHorizonral': 0, // ⽔平对⻬⽅式：0:左对⻬ 1:居中对⻬ 2:右对⻬
      'textAlignVertical': 0, // 垂直 对⻬⽅式：0:顶对⻬ 1:垂直居中 2:底对⻬
      'letterSpacing': 0.2, // 字⺟之间的标准间隔，单位mm
      'lineSpacing': 1.0, // 字⺟之间的标准间隔，单位mm
      'lineMode': 0, // 默认4，宽⾼固定超出内容裁切
      'fontStyle': [false, false, false, false] // 字体样式[斜体，加粗，下划线，删除下划线（预留）]
    };
    var pageCount = page; // pageCount 页数
    var quantityCount = quantc; // quantityCount 份数
    var density = '3'; // density 浓度
    var paperType = '1'; // paperType 纸张类型
    var printMode = '1'; // paperType 打印模式
    // 绘制文本
    DrawLableText(DrawLableTextParam, function() {
      const self = this;
      // 图像参数
      var generateImagePreviewImageParam = {
        'displayScale': 8 // 显示比例
      };
      //  // 生成预览图
      generateImagePreviewImage(generateImagePreviewImageParam['displayScale'], function(data) {
        var arrParse = JSON.parse(JSON.stringify(data));
        // var Epc = document.getElementById('searchRfidBox');
        var base64Data = arrParse.resultAck.info;
        var obj = JSON.parse(base64Data);
        var dataimg = obj.ImageData;

        var imgDisplay = document.getElementById('base64image');
        var errorCode = obj.errorCode;
        that.printSrc = 'data:image/jpeg;base64,' + dataimg
        //  console.log(this.src)
        //  self.imgSrc = "data:image/jpeg;base64,"+data;
        //  $('#imgs').prop('src', "data:image/jpeg;base64," + dataimg);
      });
      //  提交数据
      var totalCount = parseInt(pageCount) * parseInt(quantityCount);
      // 开始打印任务
      startJob(parseInt(density), parseInt(paperType), parseInt(printMode), totalCount, function(data) {
        var arrParse = JSON.parse(JSON.stringify(data));
        if (arrParse.resultAck.result != 0) {
          self.$message({
            message: '打印失败！',
            type: 'warning'
          });
          return;
        }

        var intPageCount = parseInt(pageCount);
        var intQuantityCount = parseInt(quantityCount);
        sendCommitJob(datas, pageIndex, intPageCount, intQuantityCount, that);
      });
    });
  });
}
/**
 * 提交打印数据
 * @param {json}   printData 打印数据
 * @param {number} pageIndex 页序号
 * @param {number} pageCount 页数
 * @param {number} quantityCount 单页的份数
 */
export function sendCommitJob(printData, pageIndex, pageCount, quantityCount) {
  var jsonObj = {
    'printerImageProcessingInfo': {
      'printQuantity': quantityCount
    }
  };
  commitJob(null, JSON.stringify(jsonObj), function(data) {
    var arrParse = JSON.parse(JSON.stringify(data));
    var resultInfo = 'commitJob ok';
    // 结束打印
    console.log(arrParse.resultAck.printQuantity + '===' + pageCount + '&&' + arrParse.resultAck
      .onPrintPageCompleted + '===' + quantityCount);
    if (arrParse.resultAck.printQuantity === pageCount && arrParse.resultAck.onPrintPageCompleted === quantityCount) {
      endJob();
      return;
    }
    if (String(arrParse.resultAck.info).indexOf(resultInfo) > -1 && pageIndex != pageCount) {
      number++;
      pageIndex++;
      // 画布参数
      var InitDrawingBoardParam = {
        'width': 58, // 画布宽度
        'height': 47, // 画布高度
        'rotate': 360, // 画布旋转角度
        'path': 'ZT001.ttf', // 字体
        'verticalShift': 0, // 纵向偏移
        'HorizontalShift': 0 // 横向偏移
      };

      setTimeout(function() {
        console.log(printData[number]);
        //  初始化画板
        InitDrawingBoard(InitDrawingBoardParam, function() {
          // 一维码参数
          var DrawLableBarCodeParam = {
            'x': 0.5,
            'y': 38.5,
            'height': 10,
            'width': 57,
            'value': printData[number].sampNo,
            'codeType': 20,
            'rotate': 0,
            'fontSize': 2,
            'textHeight': 0,
            'textPosition': 2
          };
          // 一维码绘制
          DrawLableBarCode(DrawLableBarCodeParam);

          // 文本参数
          var DrawLableTextParam = {
            'x': 0.5, // 横向  上
            'y': 0.5, // 纵向   横
            'height': 47,
            'width': 58,
            'value': '样品编号:' + printData[number].sampNo + '\r\n' +
              '检测项目:' + printData[number].targetName + '\r\n' +
              '保存方式:' + '',
            //  "保存方式:" + printData[number].savetype,
            'fontFamily': '宋体',
            'rotate': 0, // 垂直 对⻬⽅式：0:顶对⻬ 1:垂直居中 2:底对⻬
            'fontSize': 3.0, // 字体⼤⼩，单位mm
            'textAlignHorizonral': 0, // ⽔平对⻬⽅式：0:左对⻬ 1:居中对⻬ 2:右对⻬
            'textAlignVertical': 0, // 垂直 对⻬⽅式：0:顶对⻬ 1:垂直居中 2:底对⻬
            'letterSpacing': 0.2, // 字⺟之间的标准间隔，单位mm
            'lineSpacing': 1.0, // 字⺟之间的标准间隔，单位mm
            'lineMode': 0, // 默认4，宽⾼固定超出内容裁切
            'fontStyle': [false, false, false, false] // 字体样式[斜体，加粗，下划线，删除下划线（预留）]
          };
          //  添加文字
          // self.DrawLableTextParam.value = "精臣SDK-第"+pageIndex+"页"
          DrawLableText(DrawLableTextParam, function() {
            sendCommitJob(printData, pageIndex, pageCount, quantityCount);
          });
        }); //  提交数据
      }, 1000);
    }
  });
}

// 初始化打印服务
// 1.1 获取接口实例JCAPI.getInstance（单例模式）
function getInstance() {
  if ('WebSocket' in window) {
    g_websocket = websocketLifePeriod();
  } else {
    console.log('unsupported websocket');
    // return false;
    g_websocket = null;
    return false;
  }

  // 保持在线
  setInterval(function() {
    if (g_websocket.readyState === 2 || g_websocket.readyState === 3) {
      getInstance();
    }
  }, 3000);

  return true;
}

function unInitPrintInstance() {
  g_websocket.close();
}

// 2.1 打印机连接成功回调onConnectSuccess
function onConnectSuccess(printerName) {
  console.log('连接打印机!');
}

// 2.2 打印机断开回调onDisConnect
function onDisConnect(printerName) {
  console.log('打印机断开！');
}

// 2.3 打印机上盖变化回调onCoverStatusChange
function onCoverStatusChange(coverStatus) {
  console.log('打印机盒盖有变化！');
}

// 2.4 打印机电量变化回调onElectricityChange()
function onElectricityChange(powerLever) {
  console.log('打印机电量有变化！');
}

// 2.5 打印机纸张状态变化回调onPaperStatusChange
function onPaperStatusChange(paperStatus) {
  console.log('打印机纸张状态有变化！');
}

// 8.1 页打印成功回调onPrintPageCompleted
function onPrintPageCompleted() {
  console.log('页打印状态有变化！');
}

// 8.2 打印进度回调onPrintProgress
function onPrintProgress() {
  console.log('打印进度有变化！');
}

// 8.3 打印异常回调onAbnormalResponse
function onAbnormalResponse() {
  console.log('打印异常！');
}

// 获取所有当前PC上连接的精臣打印机
// 3.1 获取打印机列表getAllPrinters()
function getAllPrinters(callbackFunction) {
  // 刷新设备时，关闭设备
  // closePrinter();
  var jsonObj = {
    apiName: 'getAllPrinters'
  };
  var allDevice = {};

  sendMsg(jsonObj, callbackFunction);
}

// 4.图片打印
/* base64Data--图片base64数据
nPrintCount--打印数量
bDenoise--降噪 */
function picturePrint(base64Data, nPrintCount, bDenoise, callbackFunction) {
  var jsonObj = {
    apiName: 'picturePrint',
    parameter: {
      data: base64Data,
      nPrintCount: nPrintCount,
      bDenoise: bDenoise
    }
  };

  sendMsg(jsonObj, callbackFunction);
}

// 5.选择并打开需要使用的打印机名称，及端口号
function selectPrinter(printerName, port, callbackFunction) {
  var jsonObj = {
    apiName: 'selectPrinter',
    parameter: {
      printerName: printerName,
      port: port
    }
  };
  sendMsg(jsonObj, callbackFunction);
}

// 6.停止打印
function stopPrint(callbackFunction) {
  var jsonObj = {
    apiName: 'stopPrint'
  };
  sendMsg(jsonObj, callbackFunction);
}

// 7.关闭打印端口

function closePrinter(callbackFunction) {
  var jsonObj = {
    apiName: 'closePrinter'
  };
  sendMsg(jsonObj, callbackFunction);
}

// 8.设置打印浓度
// nDensity--范围为getDensityScopeApi查询范围
function setPrintDensity(nDensity, callbackFunction) {
  var jsonObj = {
    apiName: 'setPrintDensity',
    parameter: {
      nDensity: nDensity
    }
  };
  sendMsg(jsonObj, callbackFunction);
}

// 9.设置打印速度
// nSpeed--范围为getSpeedScopeApi查询的范围
function setPrintSpeed(nSpeed, callbackFunction) {
  var jsonObj = {
    apiName: 'setPrintSpeed',
    parameter: {
      nSpeed: nSpeed
    }
  };
  sendMsg(jsonObj, callbackFunction);
}

// 10.设置打印标贴类型
// nType--间隙：01，黑标：02，连续纸：03，定位孔：04，透明纸：05，随机打印：06
function setPrintLabelType(nType, callbackFunction) {
  var jsonObj = {
    apiName: 'setPrintLabelType',
    parameter: {
      nType: nType
    }
  };
  sendMsg(jsonObj, callbackFunction);
}

function setPrintMaterial(nType, callbackFunction) {
  var jsonObj = {
    apiName: 'setPrintMaterial',
    parameter: {
      nType: nType
    }
  };
  sendMsg(jsonObj, callbackFunction);
}

// 11.设置关机时间
// nType--1：15分钟，2:30分钟，3:60分钟，4：never
function setPrinterAutoShutDownTime(nType, callbackFunction) {
  var jsonObj = {
    apiName: 'setPrinterAutoShutDownTime',
    parameter: {
      nType: nType
    }
  };
  sendMsg(jsonObj, callbackFunction);
}

// 12.复位打印机
function setPrinterReset(callbackFunction) {
  var jsonObj = {
    apiName: 'setPrinterReset'
  };
  sendMsg(jsonObj, callbackFunction);
}

// 纸张标定
function setPrintPaperPos(nType, callbackFunction) {
  var jsonObj = {
    apiName: 'setPrintPaper',
    parameter: {
      nType: nType
    }
  };
  sendMsg(jsonObj, callbackFunction);
}

// 13.设置打印模式
// nType-1热敏，2碳带
function setPrintMode(nType, callbackFunction) {
  var jsonObj = {
    apiName: 'setPrintMode',
    parameter: {
      nType: nType
    }
  };
  sendMsg(jsonObj, callbackFunction);
}

// 14.获取打印速度
function getPrintSpeed(callbackFunction) {
  var jsonObj = {
    apiName: 'getPrintSpeed'
  };
  sendMsg(jsonObj, callbackFunction);
}

function getPower(callbackFunction) {
  var jsonObj = {
    apiName: 'getPower'
  };
  sendMsg(jsonObj, callbackFunction);
}

// 15.获取标贴类型
function getPrintLabelType(callbackFunction) {
  var jsonObj = {
    apiName: 'getPrintLabelType'
  };

  sendMsg(jsonObj, callbackFunction);
}

// 16.获取打印浓度
function getPrintDensity(callbackFunction) {
  var jsonObj = {
    apiName: 'getPrintDensity'
  };
  sendMsg(jsonObj, callbackFunction);
}

// 17.获取打印机语言
function getPrinterLanguageType(callbackFunction) {
  var jsonObj = {
    apiName: 'getPrinterLanguageType'
  };
  sendMsg(jsonObj, callbackFunction);
}

// 18.查询关机时间
function getPrinterAutoShutDownTime(callbackFunction) {
  var jsonObj = {
    apiName: 'getPrinterAutoShutDownTime'
  };
  sendMsg(jsonObj, callbackFunction);
}

// 19.获取打印机序列号
function getPrinterSn(callbackFunction) {
  var jsonObj = {
    apiName: 'getPrinterSn'
  };
  sendMsg(jsonObj, callbackFunction);
}

// 20.获取硬件版本
function getPrinterHardwareVersion(callbackFunction) {
  var jsonObj = {
    apiName: 'getPrinterHardwareVersion'
  };
  var responseData = {};
  sendMsg(jsonObj, callbackFunction);
}

// 21.获取软件版本
function getPrinterSoftwareVersion(callbackFunction) {
  var jsonObj = {
    apiName: 'getPrinterSoftwareVersion'
  };
  sendMsg(jsonObj, callbackFunction);
}

// 获取打印Tag
function getPrinterTagID(callbackFunction) {
  var jsonObj = {
    apiName: 'getPrinterTagID'
  };
  sendMsg(jsonObj, callbackFunction);
}

// 获取打印次数
function getPrinterTimes(callbackFunction) {
  var jsonObj = {
    apiName: 'getPrinterTimes'
  };
  sendMsg(jsonObj, callbackFunction);
}

// 获取打印机语言
function setPrinterLanguageType(nType, callbackFunction) {
  var jsonObj = {
    apiName: 'setPrinterLanguageType',
    parameter: {
      nType: nType
    }
  };
  sendMsg(jsonObj, callbackFunction);
}

// 将图像转换为base64数据，仅供demo测试使用，暂时有问题
function readFileWithBase64(filePath, callbackFunction) {
  var jsonObj = {
    apiName: 'readFileWithBase64',
    parameter: {
      filePath: filePath
    }
  };
  sendMsg(jsonObj, callbackFunction);
}

// 发送十六进制指令，仅供demo测试使用
function sendData(data, dataSize, callbackFunction) {
  var jsonObj = {
    apiName: 'sendData',
    parameter: {
      data: data,
      dataSize: dataSize
    }
  };
  sendMsg(jsonObj, callbackFunction);
}

// 获取打速度印范围
function getSpeedScope(callbackFunction) {
  var jsonObj = {
    apiName: 'getSpeedScope'
  };
  sendMsg(jsonObj, callbackFunction);
  return getResult(5, 'getSpeedScope', 'set printer language timeout!');
}

function getConnectPrinter(callbackFunction) {
  var jsonObj = {
    apiName: 'getConnectPrinter'
  };
  sendMsg(jsonObj, callbackFunction);
  return getResult(5, 'getConnectPrinter', 'get connect printer timeout!');
}

function getPrinterType(callbackFunction) {
  var jsonObj = {
    apiName: 'getPrinterType'
  };
  sendMsg(jsonObj, callbackFunction);
}

// 获取浓度范围
function getDensityScope(callbackFunction) {
  var jsonObj = {
    apiName: 'getDensityScope'
  };
  sendMsg(jsonObj, callbackFunction);
}

function sendMsg(msg, callback) {
  console.log('sendMsg', msg.apiName);
  MessageList[msg.apiName] = callback;
  var data = JSON.stringify(msg);
  var tryTimes = 10;
  for (var i = 0; i < tryTimes; i++) {
    if (g_websocket.readyState === 1) {
      g_websocket.send(data);
      return;
    }
  }
}

function getPrinterMode(callbackFunction) {
  var jsonObj = {
    apiName: 'getPrintMode'
  };
  sendMsg(jsonObj, callbackFunction);
}

function getMacAddress(callbackFunction) {
  var jsonObj = {
    apiName: 'getMacAddress'
  };
  sendMsg(jsonObj, callbackFunction);
}

function setLog() {
  var jsonObj = {
    apiName: 'setLog'
  };
  sendMsg(jsonObj, null);
}

// 32.连接回调
function connectCallback(e) {
  ackJsonData = '';
  console.log('success');
}

// 33.关闭连接回调
function closeCallback(e) {
  console.log(
    'websocket closed: ' + e.code + ' ' + e.reason + ' ' + e.wasClean
  );
  //  globalwebsocket = websocket;
  g_websocket.close();
  // websocketLifePeriod();
  if (e.code == 1005) {
    //  globalwebsocket = websocket;
  }
  console.log('closed');
  ackJsonData = '';
}

function binaryData(ev) {
  return JSON.parse(new TextDecoder('utf-8').decode(new Uint8Array(ev.data)));
}

// 34.读回调
function readCallback(e) {
  // var callBackInfo = binaryData(e);
  // var callBackInfo = new TextDecoder("utf-8").decode(new Uint8Array(e.data));
  var callBackInfo = e.data;
  console.log('readCallback', callBackInfo);
  ackJsonData = callBackInfo;

  var callbackName;

  if (isJSON(ackJsonData)) {
    var arrParse = JSON.parse(ackJsonData);

    // 接口回调
    if (MessageList[arrParse.apiName]) {
      MessageList[arrParse.apiName](arrParse);
    }

    // 回调分发
    if (arrParse['resultAck']['callback'] != undefined) {
      callbackName = arrParse['resultAck']['callback']['name'];

      if (callbackName == 'onConnectSuccess') {
        var printerName = arrParse['resultAck']['callback']['printerName'];

        onConnectSuccess(printerName);
      } else if (callbackName == 'onDisConnect') {
        var printerName = arrParse['resultAck']['callback']['printerName'];
        onDisConnect(printerName);
      } else if (callbackName == 'onCoverStatusChange') {
        var coverStatus = arrParse['resultAck']['callback']['coverStatus'];
        onCoverStatusChange(coverStatus);
      } else if (callbackName == 'onElectricityChange') {
        var powerLever = arrParse['resultAck']['callback']['powerLever'];
        onElectricityChange(powerLever);
      } else if (callbackName == 'onPaperStatusChange') {
        var paperStatus = arrParse['resultAck']['callback']['paperStatus'];
        onPaperStatusChange(paperStatus);
      } else if (callbackName == 'onPrintPageCompleted') {
        onPrintPageCompleted();
      } else if (callbackName == 'onPrintProgress') {
        onPrintProgress();
      } else if (callbackName == 'onAbnormalResponse') {
        onAbnormalResponse();
      } else {
        console.log('unknow callback api!');
      }
    }

    ackJsonData = '';
  }
}
// 35.错误回调
function errorCallback(e) {
  // 如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
  console.log(e.data);
}

// 0.初始化sdk
//
function initSdk(fontDir) {
  var jsonObj = {
    apiName: 'initSdk',
    parameter: {
      fontDir: fontDir
    }
  };
  sendMsg(jsonObj, null);
}
// 13.设置打印模式
// nType-1热敏，2碳带
function setPrintMode(nType, callbackFunction) {
  var jsonObj = {
    apiName: 'setPrintMode',
    parameter: {
      nType: nType
    }
  };
  sendMsg(jsonObj, callbackFunction);
}
/**
 * 1.开始打印任务
 * @param {number} printDensity 打印浓度
 * @param {number} printLabelType 纸张类型
 * @param {number} printMaterial 材质
 * @param {number} printMode 打印模式
 * @param {number} count 总打印张数
 * @param {*} callbackFunction 回调函数
 */
function startJob(printDensity, printLabelType, printMode, count, callbackFunction) {
  var jsonObj = {
    apiName: 'startJob',
    parameter: {
      printDensity: printDensity,
      printLabelType: printLabelType,
      printMode: printMode,
      count: count
    }
  };
  sendMsg(jsonObj, callbackFunction);
}

// 2.提交打印任务commitJob
// 打印开始

function commitJob(printData, printerImageProcessingInfo, callbackFunction) {
  var printDataJson = eval('(' + printData + ')');
  var printerImageProcessingInfoJson = eval('(' + printerImageProcessingInfo + ')');
  var jsonObj = {
    apiName: 'commitJob',
    parameter: {
      printData: printDataJson,
      printerImageProcessingInfo: printerImageProcessingInfoJson['printerImageProcessingInfo']
    }
  };
  sendMsg(jsonObj, callbackFunction);
}

// 3.结束打印任务endJob
// 发送打印总结束
function endJob(callbackFunction) {
  var jsonObj = {
    apiName: 'endJob'
  };
  sendMsg(jsonObj, callbackFunction);
  // return getResult(5, 'endJob', 'set printer language timeout!');
}

// 4.取消打印任务cancleJob
// 发送取消打印指令

function cancleJob(callbackFunction) {
  var jsonObj = {
    apiName: 'stopPrint'
  };
  sendMsg(jsonObj, callbackFunction);
  // return getResult(5, 'cancleJob', 'set printer language timeout!');
}

// 42.7.1 图像绘制drawImage
// 处理打印图像
function drawImage(base64, x, y, width, height, rotate) {
  var jsonObj = {
    apiName: 'drawImage',
    parameter: {
      data: base64,
      x: x,
      y: y,
      width: width,
      height: height,
      orientation: rotate
    }
  };
  sendMsg(jsonObj, null);
  // return getResult(5, 'drawImage', 'set printer language timeout!');
}

function updateFirmware(fileName, strSwVersion, strCrc, strHwVersion, nPrinterType) {
  var jsonObj = {
    apiName: 'updateFirmware',
    parameter: {
      fileName: fileName,
      strSwVersion: strSwVersion,
      strCrc: strCrc,
      strHwVersion: strHwVersion,
      nPrinterType: nPrinterType
    }
  };
  sendMsg(jsonObj, null);
  // return getResult(5, 'drawImage', 'set printer language timeout!');
}

function cancleUpdateFirmware() {
  var jsonObj = {
    apiName: 'cancleUpdateFirmware'
  };
  sendMsg(jsonObj, null);
  // return getResult(5, 'drawImage', 'set printer language timeout!');
}

function updateFrontpanel(fileName, strSwVersion, strCrc) {
  var jsonObj = {
    apiName: 'updateFrontpanel',
    parameter: {
      fileName: fileName,
      strSwVersion: strSwVersion,
      strCrc: strCrc
    }
  };
  sendMsg(jsonObj, null);
  // return getResult(5, 'drawImage', 'set printer language timeout!');
}

function cancleUpdateFrontpanel() {
  var jsonObj = {
    apiName: 'cancleUpdateFrontpanel'
  };
  sendMsg(jsonObj, null);
  // return getResult(5, 'drawImage', 'set printer language timeout!');
}

function initImageProcessing(data) // 初始化图像字体
{
  var jsonObj = {
    apiName: 'initImageProcessing',
    parameter: {
      fontFamilyPath: data,
      defaultFamilyPath: data
    }
  };
  console.log('sendMsg111', jsonObj);
  sendMsg(jsonObj, null);
}

// 暂停打印
function pausePrint(callbackFunction) {
  var jsonObj = {
    apiName: 'pausePrint'
  };
  sendMsg(jsonObj, callbackFunction);
}

// 启动打印
function resumePrint(callbackFunction) {
  var jsonObj = {
    apiName: 'resumePrint'
  };
  sendMsg(jsonObj, callbackFunction);
}

/** *********************第三方绘制打印接口******************************/
function initSdk(json, callbackFunction) {
  var jsonObj = {
    apiName: 'initSdk',
    parameter: json
  };

  sendMsg(jsonObj, callbackFunction);
}

// 创建画板
function InitDrawingBoard(json, callbackFunction) {
  var jsonObj = {
    apiName: 'InitDrawingBoard',
    parameter: json
  };

  sendMsg(jsonObj, callbackFunction);
}

// 绘制文本
function DrawLableText(json, callbackFunction) {
  var jsonObj = {
    apiName: 'DrawLableText',
    parameter: json
  };

  sendMsg(jsonObj, callbackFunction);
}

// 绘制一维码
function DrawLableBarCode(json, callbackFunction) {
  var jsonObj = {
    apiName: 'DrawLableBarCode',
    parameter: json
  };

  sendMsg(jsonObj, callbackFunction);
}

// 绘制二维码
function DrawLableQrCode(json, callbackFunction) {
  var jsonObj = {
    apiName: 'DrawLableQrCode',
    parameter: json
  };

  sendMsg(jsonObj, callbackFunction);
}

// 绘制线条
function DrawLableLine(json, callbackFunction) {
  var jsonObj = {
    apiName: 'DrawLableLine',
    parameter: json
  };

  sendMsg(jsonObj, callbackFunction);
}

// 绘制图形
function DrawLableGraph(json, callbackFunction) {
  var jsonObj = {
    apiName: 'DrawLableGraph',
    parameter: json
  };

  sendMsg(jsonObj, callbackFunction);
}

// 绘制图像
function DrawLableImage(json, callbackFunction) {
  var jsonObj = {
    apiName: 'DrawLableImage',
    parameter: json
  };

  sendMsg(jsonObj, callbackFunction);
}

// 生成预览图
function generateImagePreviewImage(displayScale, callbackFunction) {
  var jsonObj = {
    apiName: 'generateImagePreviewImage',
    displayScale: displayScale
  };

  sendMsg(jsonObj, callbackFunction);
}

// 图片打印
function picturePrint (imgBase64, callbackFunction) {
  var jsonObj = {
    apiName: 'picturePrint',
    parameter: imgBase64
  };

  sendMsg(jsonObj, callbackFunction);
}

// 打开链接及回调
function websocketLifePeriod() {
  var websocket;
  websocket = new WebSocket('ws:// 127.0.0.1:37989');
  //  websocket.binaryType = 'arraybuffer';
  websocket.onerror = function(evt) { //  since there is an error, sockets will close so...
    //  sok.onclose = function(e) {
    //    console.log('WebSocket Error:', e);
    //  }
  }

  websocket.proxy_read_timeout = 10000;
  websocket.binaryType = 'arraybuffer';

  websocket.onopen = connectCallback;

  websocket.onclose = closeCallback;

  websocket.onmessage = readCallback;

  websocket.onerror = errorCallback;

  console.log(websocket);

  return websocket;
}

// 调用结果
function getResult(tryTime, apiName, errInfo) {
  let tryTimes = tryTime;

  let result = {};
  while (tryTimes--) {
    if (!isJSON(ackJsonData)) continue;

    var arrParse = JSON.parse(ackJsonData);
    if (arrParse['apiName'] === apiName) {
      result = arrParse['resultAck'];
      break;
    }
  }

  if (tryTimes <= 0) {
    result['result'] = false;
    result['errorCode'] = 0x12;
    result['info'] = errInfo;
  }
  return result;
}

function isJSON(str) {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj === 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      //  console.log('error：'+str+'!!!'+e);
      return false;
    }
  }
  console.log('It is not a string!');
}
