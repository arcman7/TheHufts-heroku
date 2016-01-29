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
  });
}

$(document).on("ready",function(){
  setBrowserKey();
  initializeStockGraph();
});
