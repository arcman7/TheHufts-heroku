$(document).on("ready",function(){
  $('.test-link').on("click", function(e){
    e.preventDefault();
    console.log("clicked")
    $('.profit-row').hide();
  })
});

var cm = CodeMirror(document.getElementById('cmContainer'), {
          mode: "javascript",
          theme: "default",
          lineNumbers: true,
          readOnly: true
});

var docJS = CodeMirror.Doc('function basicTest(array){\n// This basic algorithm should buy at everypoint the\n// next days price is higher than the current days price.\n// It should sell whenever the current price is higher\n// than the bought price.\n\n// array => arrayOfDailyStockData\n// [ [t0,p0], [t1,p1], ... [tN,pN]]\n// Each element (data) of the array is a sub-array with\n// two elements; time, price\n// time = data[0]\n// price = data[1]\n  var buy,sell,time,price,buySellSignals;\n  buy = []; sell = [];\n  array.forEach(function (day,index){\n    if(index >= array.length - 1){ return };\n    time  = day[0];\n    price = day[1];\n\n    nextprice = array[index+1][1];\n    if(price < nextprice){ //the third element of the buy-signal is optional\n      buy.push([time,price,index]);\n    }\n  });\n  buy.forEach(function (buySignal){\n    var buyIndex = buySignal[2];\n    var boughtPrice = buySignal[1];\n    var sellTime;\n    for(var i = buyIndex+1; i< array.length - 1; i++){\n      price    = array[i][1];\n      sellTime = array[i][0];\n      if(price > boughtPrice){//third element of the sell-signal is optional\n        sell.push([sellTime,price,buyIndex]);\n        break;\n      }\n    }\n  });//the return / output of the function bust be an object with two keys;\n  // buy & sell\n  buySellSignals = {buy: buy, sell: sell};\n  return buySellSignals;\n}');
var docCPlus = CodeMirror.Doc('#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct Quote {\n  string timestamp;\n  double price;\n};\n\nvector<vector<Quote>> runAlgo(vector<Quote> stockData) {\n  vector<Quote> buy;\n  vector<Quote> buyCopy;\n  vector<Quote> sell;\n  vector<vector<Quote>> results;\n\n  for (vector<Quote>::iterator it = stockData.begin(); it != stockData.end(); ++it) {\n    string timestamp = (*it).timestamp;\n    double price = (*it).price;\n\n    if (it + 1 == stockData.end()){\n      break;\n    }\n\n    if (price < (*(it+1)).price) {\n      Quote buySignal;\n      buySignal.price = price;\n      buySignal.timestamp = timestamp;\n      buy.push_back(buySignal);\n    }\n\n    for (vector<Quote>::iterator it2 = buy.begin(); it2 != buy.end(); ++it2) {\n      double buyPrice = (*it2).price;\n\n      if (buyPrice < price) {\n        Quote sellSignal;\n        sellSignal.price = price;\n        sellSignal.timestamp = timestamp;\n        sell.push_back(sellSignal);\n        buyCopy.push_back(*it2);\n      }\n    }\n  }\n  results.push_back(buyCopy);\n  results.push_back(sell);\n  return results;\n}');
var docRuby = CodeMirror.Doc('\ndef basicTest(array)\n  # This basic algorithm should buy at every point the\n  # next days price is higher than the current days price.\n  # it should sell whenenever the current price is higher\n  # than the bought price.\n\n  # array => array_of_daily_stock_Data\n  # [ [t0,p0],[t1,p1], ... [tN,pN]]\n  # Each element (data) of the array is a sub-array with\n  # two elements; time, price\n  # time = data[0]\n  # price = data[1]\n buy = []\n sell = []\n   array.each_with_index do |day,index|\n     if(index >= array.length - 1)\n       break\n     end\n     time  = day[0]\n     price = day[1]\n     nextprice = array[index+1][1]\n     if(price < nextprice)\n      #the third element of the buy-signa is optional\n       buy << [time,price,index]\n     end\n   end\n  buy.each do |buySignal|\n    buyIndex = buySignal[2]\n    boughtPrice = buySignal[1]\n    array.each_with_index do |day,index|\n      price    = array[index][1]\n      sellTime = array[index][0]\n      if(price > boughtPrice)\n      # third element of the sell-signal is optional\n        sell.push << [sellTime,price,buyIndex]\n        break\n      end\n    end\n  end\n   # the return / output of the function must be an object with two keys;\n   # buy & sell\n  buySellSignals = {buy: buy, sell: sell};\n  return buySellSignals\nend');
var docPython = CodeMirror.Doc('def basicTest(stockList):\n# list => listOfDailyStockData\nbuy = list([day[0], day[1], index] for index, day in enumerate(stockList[0:len(stockList)-2]) if stockList[index+1][1] > day[1])\nsell = list([stockList[signal[0]], stockList[signal[1]], signal[2]] for signal in buy[0:len(buy)-1] if stockList[signal[1]] > signal[1])\nreturn {"buy": buy, "sell": sell}\n\nprint basicTest(stockList)');
cm.swapDoc(docJS);
cm.setOption('mode', 'javascript');


function swapJS() {
    cm.swapDoc(docJS);
    cm.setOption('mode', 'javascript');
};

function swapCPlus() {
    cm.swapDoc(docCPlus);
    cm.setOption('mode', 'text/x-c++src');
};
function swapRuby() {
    cm.swapDoc(docRuby);
    cm.setOption('mode', 'ruby');
};
function swapPython() {
    cm.swapDoc(docPython);
    cm.setOption('mode', 'python');
};
