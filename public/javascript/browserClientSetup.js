//GlobalVariables
var newCodeMirror;
//END GloblaVariables

function randomString(length, chars) {
  var mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  var result = '';
  for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
  return result;
}

function initializeCoderPadWithDemo(){
  var username = String(window.location).split('=')[1];
  var url = protocol + "//" + domain + "/passAlgoFile";
  var text = 'function basicTest(array){\n// This basic algorithm should buy at everypoint the\n// next days price is higher than the current days price.\n// It should sell whenever the current price is higher\n// than the bought price.\n\n// array => arrayOfDailyStockData\n// [ [t0,p0], [t1,p1], ... [tN,pN]]\n// Each element (data) of the array is a sub-array with\n// two elements; time, price\n// time = data[0]\n// price = data[1]\n  var buy,sell,time,price,buySellSignals;\n  buy = []; sell = [];\n  array.forEach(function (day,index){\n    if(index >= array.length - 1){ return };\n    time  = day[0];\n    price = day[1];\n\n    nextprice = array[index+1][1];\n    if(price < nextprice){ //the third element of the buy-signal is optional\n      buy.push([time,price,index]);\n    }\n  });\n  buy.forEach(function (buySignal){\n    var buyIndex = buySignal[2];\n    var boughtPrice = buySignal[1];\n    var sellTime;\n    for(var i = buyIndex+1; i< array.length - 1; i++){\n      price    = array[i][1];\n      sellTime = array[i][0];\n      if(price > boughtPrice){//third element of the sell-signal is optional\n        sell.push([sellTime,price,buyIndex]);\n        break;\n      }\n    }\n  });//the return / output of the function bust be an object with two keys;\n  // buy & sell\n  buySellSignals = {buy: buy, sell: sell};\n  return buySellSignals;\n}';

  $('#code1').text(text);
  $('.codemirror').remove();
    //update codemirror pad
  var newCodeMirror = CodeMirror.fromTextArea(document.getElementById('code1'), {
      mode: "javascript",
      theme: "default",
      lineNumbers: true,
      readOnly: true
  });  //end codemirror
  newCodeMirror.setSize(900, 900);

  // var data = { username: username, algoName: 'psychicDemo', demo: true};
  //   var request = $.ajax({
  //     url: url,
  //     type: "post",
  //     data: data
  //   });

    // request.done(function (response){
    //   //console.log('done');
    //   //console.log(response);
    //   //console.log("key: ", window.access_key);
    //   response = JSON.parse(response);
    //   var fileType = response.fileType;
    //   var text = decrypt(response.algoFile, window.access_key);
    //     //set text-area for code pad to be generated from
    //   $('#code1').text(text);
    //   $('.codemirror').remove();
    //     //update codemirror pad
    //   var newCodeMirror = CodeMirror.fromTextArea(document.getElementById('code1'), {
    //       mode: "javascript",
    //       theme: "default",
    //       lineNumbers: true,
    //       readOnly: true
    //   });  //end codemirror
    //   newCodeMirror.setSize(900, 900);
    //   });//end done function

    // request.fail(function (error){
    //   console.log(error);
    // });
}

function queryYahooAPI(symbol,callback,container,options){

    if(!options){
      var options ={};
      options.end   = yahooDateString();
      var d = new Date();
      var d300ago = new Date(d - 300*3600*1000*24);
      options.start = yahooDateString(d300ago);
    }
    var query = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22"+ symbol + "%22%20and%20startDate%20%3D%20%22"+options.start+"%22%20and%20endDate%20%3D%20%22"+options.end+"%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    var request = $.ajax({
      url: query,
      method: 'get'
    })

    request.done(function(response){

      var goodQuery = ( response["query"]["results"] != null );

      if (goodQuery){
        result = callback(response["query"]["results"]["quote"]);
        processedStockData[symbol] = result;
        graphHome(result,container,"Day",undefined,symbol);
        $(".graph").css("border","1px solid black");
      }

    });
}

function yahooJson2HighchartsDATA(arrayOfJson){
  mappedData = [];
  arrayOfJson.forEach(function(qouteObject){ //1st - make date time object from string, 2nd - convert it to decimal form
    mappedData.unshift([Number(new Date(qouteObject["Date"])),Number(qouteObject["Close"])]);
  });
  return mappedData;
}

function initializeStockGraph(){
queryYahooAPI('P', yahooJson2HighchartsDATA,$(".graph"));
globalSymbol = 'P';
    $(".graph").html("");
    $(".graph").css("display",'block');
    $(".graph").css("height","30em");
    $(".graph").css("width","100%");
    $(".graph").css("background","url('http://3.bp.blogspot.com/-FjddXJJsIv8/VeaoXmv8HQI/AAAAAAAAGww/PlCl0uSR_9g/s1600/loading.gif')");
}

function setBrowserKey(){
  window.access_key = randomString(77,"aA#");
  var url = protocol+ '//' + domain + '/setBrowserKey';

  var username = String(window.location).split('=')[1];

  var data = { browserKey: window.access_key, domain: domain, protocol: protocol, username: username };
  var gateKeeperURL = protocol + "//" + domain + "/gateKeeper/knockKnock";

  $.ajax({
    url: url,
    type: "post",
    data: data
  }).done(function (response){
    console.log(response);
    initializeCoderPadWithDemo()
  });
}

function tabLanguageListener(){
  $('#javascript-lang').on('click',function(e){
    $('.codemirror').remove();
    console.log("javascript");
    var newCodeMirror = CodeMirror.fromTextArea(document.getElementById('code1'), {
          mode: "javascript",
          theme: "default",
          lineNumbers: true,
          readOnly: false
      });  //end codemirror
      newCodeMirror.setSize(900, 900);
  });//end click function


  $('#cplusplus-lang').on('click',function(e){
     $('.codemirror').remove();
     console.log("c++");
    var newCodeMirror = CodeMirror.fromTextArea(document.getElementById('code2'), {
          mode: "c++",
          theme: "default",
          lineNumbers: true,
          readOnly: false
      });  //end codemirror
      newCodeMirror.setSize(900, 900);
  });//end click function

  $('#ruby-lang').on('click',function(e){
     $('.codemirror').remove();
     console.log("ruby");
    var newCodeMirror = CodeMirror.fromTextArea(document.getElementById('code3'), {
          mode: "ruby",
          theme: "default",
          lineNumbers: true,
          readOnly: false
      });  //end codemirror
      newCodeMirror.setSize(900, 900);
  });//end click function

  $('#python-lang').on('click',function(e){
     $('.codemirror').remove();
     console.log("python");
    var newCodeMirror = CodeMirror.fromTextArea(document.getElementById('code4'), {
          mode: "python",
          theme: "default",
          lineNumbers: true,
          readOnly: false
      });  //end codemirror
      newCodeMirror.setSize(900, 900);
  });//end click function
}

$(document).on("ready",function(){
  setBrowserKey();
  initializeStockGraph();
  tabLanguageListener();
});