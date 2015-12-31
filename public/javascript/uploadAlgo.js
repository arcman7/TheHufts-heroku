function encrypt(string,key){
  var encrypted = CryptoJS.AES.encrypt(string,key).toString();
  return encrypted;
}

function decrypt(string,key){
  var decrypted = CryptoJS.AES.decrypt(string, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}


var yousuck = " Please refresh the page and try again.";
var userAlgoFunctions = {};

function testAlgoOutput(algoString){
  console.log(algoString);
  algoFunction1 = new Function('return ' + algoString);
  algoFunction1 = algoFunction1();
  //var output = eval(algoString);
  var testArray = [["1",2],["2",3],["3",1],["4",4],["5",5],["6",6],["7",5],["8",4],["9",5]];
  output = algoFunction1(testArray);
  console.log(output);
  var errorMessage = "";

    if (typeof(output) == "object"){
      if(output["buy"] && output["sell"]){
        if ( (output["buy"].constructor == Array) && (output["sell"].constructor == Array) ){
          var buy0 = output["buy"][0];
          var sell0 = output["sell"][0];
          if ((buy0.constructor == Array) && (sell0.constructor == Array) ){
            if (Number(buy0[1]) > 0 && Number(sell0[1]) > 0){

              if (buy0[0] && sell0[0]){
                return [true];
              }else{
                errorMessage ="The first value (index 0) inside of your nested arrays must be valid time stamp values.";
              }//end fith-nested if
            }else{
              errorMessage = "The second value (index 1) inside of your nested arrays must be valid price values.";
            }//end forth-nested if
          }else{
            errorMessage = "The objects inside of the 'buy' and 'sell' arrays must also be arrays, for example: { buy: [ [time0,price0], [time1,price1], ...] }. The nested arrays must contain time and price values respectively.";
          }//end third-nested if
        }else{
          errorMessage = "The object returned from your algorithm function must have the key(s) 'buy' and 'sell'. Both of the keys must point to array values.";
        }//end second-nested if
      }else{
        errorMessage = "The object returned from your algorithm function must contain the keys 'buy' and 'sell'.";
      }//end second-and-a-half if
    }else{
      errorMessage = "The output/return value of your algorithm function is not of type object. Don't forget to invoke your function at the end of the script ;-)";
    }//end first if
  return [false, errorMessage + yousuck];
}

function blockEval(string){
  var key = {};
  var stringArray = string.split('');
  var stringCopy = stringArray;
  stringArray.forEach(function(charr,index){
    if(index % 2 == 0){
      key[index] = charr;
      stringCopy[index] = Math.round(Math.random()*9);
    }
  });
  return [stringCopy,key];
}

function checkLogin(){
   var domain = window.location.href.split('/')[2];

   var request = $.ajax({
      url: "http://"+domain+"/checkLogin",
      type: "get",
      success: function(data, textStatus) {
        if (data.redirect) {
            // data.redirect contains the string URL to redirect to
            window.location.href = data.redirect;
        }
        else{
          //continue with uploading the algorithm
        }
      }
    });
}




function uploadFileListener(){
  document.getElementById('file-upload').onchange = function(){
    checkLogin(); //checks if the users session is active
    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function(progressEvent){
      // Entire file
      //console.log(this.result);
      // By lines
     // var lines = this.result.split('\n');
      var fileType =  file.name.split('.').pop();
      var algoScript = this.result;
      if(fileType == "js"){
        var results    = testAlgoOutput(algoScript); //returns [true], if the algo passed
      }
      else{
        var results = [ true ];
      }
      //console.log(fileType);


      if(results[0]){
        // var fileType =  file.name.split('.').pop();
        var filename = file.name.split('.')[0];
        var password = prompt("Password confirmation: ", "password");
        //console.log(password);
        console.log(algoScript);
        var encryptedAlgoString = encrypt(algoScript,password);
        //userAlgoFunctions[filename] = encryptedAlgoString;
        var data = {algo: encryptedAlgoString, name: filename, fileType: fileType, password: password};
        console.log(fileType)
        var domain = window.location.href.split('/')[2];
        var request = $.ajax({
          url: "http://"+ domain+"/saveAlgo",
          type:"post",
          data: data
        });
        request.done(function(response){
          console.log(response);
          var filename = file.name.split('.')[0]
          $("#uploaded-algos-container").append('<tr class="'+filename+'"><td>'+filename+' </td><td><input type="integer" name="principal" class="'+filename+'" value="dollar amount"></td><td></td><td><a id="'+filename+'"><i class="fa fa-line-chart text-navy"> Run</i></a></td><td><a class="killRow"><i class="fa fa-times"></i></a></td></tr>');
          algoTesterListener('#'+filename);

        });//end done function

        }//end if results[0]
      else{
        alert(results[1]);
        return;
      }
    };
    reader.readAsText(file);

    // var filename = file.name.split('.')[0]
    // $("#uploaded-algos-container").append('<tr><td> '+ filename +' </td><td></td><td><a id="'+ filename +'"><i class="fa fa-line-chart text-navy"> Run</i></a></td><td><a class="killRow"><i class="fa fa-times"></i></a></td></tr>');
    // //$("#uploaded-algos-container").append(html_string);
    // algoTesterListener('#'+filename);
  };//end .onchange function
}



function getUsersAlgoNames (){
  //var accessKey = prompt("Please confirm with your access key: ", "access-key");
  var accessKey = "huffer";
  var domain = window.location.href.split('/')[2];
  var username = String(window.location).split('=')[1];

  $.ajax({
    url: "http://" + domain + "/getAlgoNames",
    type: "post",
    data: {username: username, accessKey: accessKey}
  })
  .done(function(response){
    //console.log(response,typeof(response));
    response = JSON.parse(response);
    console.log(response);
    if(response.names){
       response.names.forEach(function (algoName){
        $("#uploaded-algos-container").append('<tr class="'+algoName+'"><td>'+ algoName+' </td><td><input type="integer" name="principal" class="'+algoName+'" value="dollar amount"></td><td></td><td><a id="'+algoName+'"><i class="fa fa-line-chart text-navy"> Run</i></a></td><td><a class="killRow"><i class="fa fa-times"></i></a></td></tr>');
        algoTesterListener('#'+algoName);
       });
    }

  }).fail(function (error){
   console.log("failed to get algo names from server, " + JSON.stringify(error));
  });
}


function pluginAlgoResults(calculations){
  var returnValue = calculations.netValue[calculations.netValue.length-1][1] - calculations.netValue[0][1];
  var previousReturn = calculations.netValue[calculations.netValue.length-1][1] - calculations.netValue[calculations.netValue.length-2][1];
  var directionR = returnValue > 0 ? "up" : "down";
  var colorR     = returnValue > 0 ? "info" : "danger";
  returnValue = returnValue.toFixed(2); previousReturn = previousReturn.toFixed(2);

  var return1 = '<div class="ibox float-e-margins"><div class="ibox-title"><h5>Return</h5></div><div class="ibox-content"><h1 class="no-margins">$'+returnValue;
  var return2 = '</h1><div class="stat-percent font-bold text-'+ colorR +'">$'+ previousReturn + '<i class="fa fa-level-'+ directionR +'"></i></div><small>Last Trade</small></div></div>';

  $("#return").html(return1 + return2);


  var percentageValue = calculations.netValue[calculations.netValue.length-1][1] / calculations.netValue[0][1] - 1;
  var previousPercentage = calculations.netValue[calculations.netValue.length-1][1] / calculations.netValue[calculations.netValue.length - 2][1] - 1;
  var directionP = previousPercentage > 0 ? "up" : "down";
  var colorP     = previousPercentage > 0 ? "info" : "danger";
  percentageValue *= 100; previousPercentage *= 100;
  percentageValue = percentageValue.toFixed(0); previousPercentage = previousPercentage.toFixed(0);
  var percentage1 = '<div class="ibox float-e-margins"><div class="ibox-title"><h5>Percentage Gain</h5></div><div class="ibox-content"><h1 class="no-margins">' + percentageValue;
  var percentage2 ='%</h1><div class="stat-percent font-bold text-' + colorP +'">'+ previousPercentage +'%<i class="fa fa-level-'+ directionP +'"></i></div><small>Previous Position</small></div></div>';


  $("#percentage").html(percentage1 + percentage2);

  var balance1 = '<div class="ibox float-e-margins"><div class="ibox-title"><h5>Balance</h5></div><div class="ibox-content"><h1 class="no-margins">$';
  var balance2 ='</h1><small>Current Balance</small></div></div>';
  var balanceValue  = calculations.netCash[calculations.netCash.length-1][1].toFixed(2);
  $("#balance").html(balance1 + balanceValue + balance2);
}


function algoTesterListener(algoId){
  $("#uploaded-algos-container").on('click',algoId,function(e){
    e.preventDefault();
    console.log('worked');
    var username = String(window.location).split('=')[1];
    var domain = window.location.href.split('/')[2];

    if(globalSymbol){
      //new Promise(resolve,reject){
        var endDate = yahooDateString();
        var d = new Date();
        var d300ago = new Date(d - 300*3600*1000*24);
        var startDate = yahooDateString(d300ago);
        var filename = algoId.slice(1);
        var data = {username: username, filename: filename, accessKey: "huffer", "symbols": JSON.stringify([ globalSymbol] ), startDate: startDate, endDate: endDate};
        console.log(data);
        var request = $.ajax({
              url: "http://" + domain + "/hufterAPI",
              type: "post",
              data: data
            }).done(function (response){
              //console.log(response);
               var hufterData = response[globalSymbol]["signals"];
               // console.log(hufterData);

               var series = formatSeries(globalSymbol,algoId,hufterData);
               //console.log(series);
               graphHome([],$(".graph"),"Day ",series,globalSymbol);
               var dollarAmount = $('#uploaded-algos-container input.'+filename+'[name="principal"]').val();

               hufterData.buy = hufter2HighchartsDATA(hufterData.buy);
               hufterData.sell = hufter2HighchartsDATA(hufterData.sell);
               var options = {
                  principal: ( Number(dollarAmount) || 100 ),
                  percentage: 100,
                  signals: {buy: hufterData.buy, sell: hufterData.sell},
                }
               console.log(options.signals);
               results = applyCash(options);
               console.log(results)
               graphHome(results.netValue, $(".results"),"Day ", undefined,globalSymbol);
               pluginAlgoResults(results);
               $(".results").css("padding","1px");
               $(".results").css("border","1px solid black");

            });
        //resolve(request)
      //}).then(function(response))

      //clearing mysterious 'A' text value from markers
      // $("#highcharts-6 > svg > g.highcharts-series-group > g > g > text").text('');
      //edit: The 'A' still fucking comes back anytime you adjust the graph!?
    }
    else{
      swal("Wait!", "Shouldn't you search a stock first so your algorithm will run against something?", "error");
    }
  });
}

function yahooDateString(date){
  if(!date){
    var year  = (new Date()).getFullYear();
    var day   = (new Date()).getDate();
    var month = (new Date()).getMonth()+1;
  }
  else{
    var year  = date.getFullYear();
    var day   = date.getDate();
    var month = date.getMonth()+1;
  }
  if (String(month).length < 2){ month = "0" + month;}
  if (String(day).length   < 2){ day   = "0" + day;  }
  //console.log(month,month.length,day,day.length);
  return year+"-"+month+"-"+day;
}

function sort(a,b){ //sorts buy / sell signals
  if (a[0] < b[0])
    return -1;
  if (a[0] > b[0])
    return 1;
  return 0;
}

function hufter2HighchartsDATA(array){
  mappedData = [];
  array.forEach(function (tupleArray){
  mappedData.unshift( [Number(new Date(tupleArray[0])), Number(tupleArray[1])] );
  });
  return mappedData.sort(sort);
}

function formatSeries(symbol,filename,buySellSignals){
  var series = [];
  var scale = "Day"
  buySellSignals.buy = hufter2HighchartsDATA(buySellSignals.buy);
  buySellSignals.sell = hufter2HighchartsDATA(buySellSignals.sell);
  console.log("format series: ",buySellSignals)
  series.push({
           id  : scale + "price",
           name: scale + "price",
           data: processedStockData[symbol],
       });
  //call algoFunction on stock data:
  //var buySellSignals = algoFunction1(processedStockData[symbol]);

  var buyFlagSeries = buySellSignals.buy.map(function(signal,index){
    return {
              "x"   : signal[0],
              "text": "bought at: $"+ signal[1],
              "id"  : "bflag-"+index,
           }//end return
  });
  var sellFlagSeries = buySellSignals.sell.map(function(signal,index){
    return {
              "x"   : signal[0],
              "text": "sold at: $"+ signal[1],
              "id"  : "sflag-"+index,
           }//end return
  });

  series.push(
   {
    "type"      : "flags",
    "onSeries"  : scale + "price",
    "shadow"    : false,
    "width"     : 7,
    //"shape"     : "url(https://mt.google.com/vt/icon?psize=20&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1&text=%E2%80%B2)",
    shape       : "circlepin",
    "data"      : buyFlagSeries,
    showInLegend: true,
    //color       : "#1eaa56",
    color       : Highcharts.getOptions().colors[0],
    name        : "Buy",
    title       : "B",
    style       : { color: 'white'},
    fillColor   : "#2884e0"
   });

  series.push(
   {
    "type"      :"flags",
    "onSeries"  : scale + "price",
    "shadow"    : false,
    "width"     : 7,
    //"shape"     : "url(https://camo.githubusercontent.com/b4f21ebe4ad7c00f459e8ed115e6efb37fe69348/687474703a2f2f63686172742e676f6f676c65617069732e636f6d2f63686172743f636873743d645f6d61705f70696e5f6c65747465722663686c643d7c464630303030)",
    shape       : "circlepin",
    "data"      : sellFlagSeries,
    showInLegend: true,
    //color       : "#f20000",
    color       : "#326d23",
    name        : "Sell",
    title       : "S",
    style       : { color: 'black'},
    fillColor   : "#18a689"
   });

  return series //contains regular stock data in addition to the newly generated signals
 }//end generateSignals



var deleteRow = function() {
  $("#uploaded-algos-container").on("click",".killRow",function(event) {
      event.preventDefault();
      var td = $(this).parent();
      var tr = td.parent();
      tr.remove();
  });
};


function applyCash(options){
  //options = {principal,percentage,buySellSignals,fee}
  options.percentage = options.percentage || 100;
  var netCash = options.principal;
  var per = options.percentage / 100; //easier syntax
  var signals = options.signals; //easier syntax
  var length = signals.buy.length;
  var shares = 0;
  var netValue = netCash;
  var fee = 0;
  if(options.transactionFee){
    fee = options.transactionFee;
  }

  //3 arrays for tracking netCash,netValue, shares
  var historicalValues = {};
  historicalValues.netCash  = [];
  historicalValues.netValue = [];
  historicalValues.shares   = [];

  var possiblyPurchased;//how many stocks can be purchased at given moment

  for(var i = 0; i<length; i++){
    var currentTime = signals.buy[i][0];

    if(i < length-1){
      var nextBuyTime = signals.buy[i+1][0];
      signals.sell.forEach(function (sell,j){
        if( currentTime <= sell[0] && sell[0] <= nextBuyTime ){
          netCash += sell[1]*shares - fee;
          shares  -= shares;
          historicalValues.netCash.push([sell[0],netCash]);
          historicalValues.shares.push([sell[0],shares]);
          netValue = netCash + shares*sell[1];
          historicalValues.netValue.push([sell[0],netValue]);
        }
       //console.log(j,sell[0]);
      });
    }
    if(netCash > 0){
      possiblyPurchased = Math.floor( (netCash-fee)*per / signals.buy[i][1]);
      if(possiblyPurchased >= 1){
        netCash -= possiblyPurchased*signals.buy[i][1] - fee;
        shares  += possiblyPurchased;
      }
    }//end if-netCash > 0
    netValue = netCash + shares*signals.buy[i][1];
    historicalValues.netCash.push([currentTime,netCash]);
    historicalValues.netValue.push([currentTime,netValue]);
    historicalValues.shares.push([currentTime,shares]);

    //sort the results
    historicalValues.netCash.sort(sort);
    historicalValues.netValue.sort(sort);
    historicalValues.shares.sort(sort);
  }//end i - for loop;
  return historicalValues;
}//end applyCash function


$(document).on('ready',function(){
  deleteRow();
  uploadFileListener();//Note: when this event is fired it has the effect of producing addtional listeners
  getUsersAlgoNames();
});//end document ready
