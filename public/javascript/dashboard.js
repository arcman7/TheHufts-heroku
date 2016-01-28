$(document).on("ready",function(){
  $('.test-link').on("click", function(e){
    e.preventDefault();
    console.log("clicked")
    $('.profit-row').hide());
  })
});

var cm = CodeMirror(document.getElementById('cmContainer'), {
          mode: "javascript",
          theme: "default",
          lineNumbers: true,
          readOnly: true
});

var docJS = CodeMirror.Doc(new Array(10).join(new Array(20).join('JS') + '\n'));
var docCPlus = CodeMirror.Doc(new Array(10).join(new Array(3).join('c++ ') + '\n'));
var docRuby = CodeMirror.Doc('\ndef basicTest(array)\n  # This basic algorithm should buy at every point the\n  # next days price is higher than the current days price.\n  # it should sell whenenever the current price is higher\n  # than the bought price.\n\n  # array => array_of_daily_stock_Data\n  # [ [t0,p0],[t1,p1], ... [tN,pN]]\n  # Each element (data) of the array is a sub-array with\n  # two elements; time, price\n  # time = data[0]\n  # price = data[1]\n buy = []\n sell = []\n   array.each_with_index do |day,index|\n     if(index >= array.length - 1)\n       break\n     end\n     time  = day[0]\n     price = day[1]\n     nextprice = array[index+1][1]\n     if(price < nextprice)\n      #the third element of the buy-signa is optional\n       buy << [time,price,index]\n     end\n   end\n  buy.each do |buySignal|\n    buyIndex = buySignal[2]\n    boughtPrice = buySignal[1]\n    array.each_with_index do |day,index|\n      price    = array[index][1]\n      sellTime = array[index][0]\n      if(price > boughtPrice)\n      # third element of the sell-signal is optional\n        sell.push << [sellTime,price,buyIndex]\n        break\n      end\n    end\n  end\n   # the return / output of the function must be an object with two keys;\n   # buy & sell\n  buySellSignals = {buy: buy, sell: sell};\n  return buySellSignals\nend');
var docPython = CodeMirror.Doc(new Array(10).join(new Array(3).join('python ') + '\n'));
cm.swapDoc(docJS);

function swapJS() {
    cm.swapDoc(docJS);
};

function swapCPlus() {
    cm.swapDoc(docCPlus);
};
function swapRuby() {
    cm.swapDoc(docRuby);
};
function swapPython() {
    cm.swapDoc(docPython);
};
