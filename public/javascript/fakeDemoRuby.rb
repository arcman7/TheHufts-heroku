def basicTest(array)
# This basic algorithm should buy at everypoint the
# next days price is higher than the current days price.
# It should sell whenever the current price is higher
# than the bought price.

# array => arrayOfDailyStockData
# [ [t0,p0], [t1,p1], ... [tN,pN]]
# Each element (data) of the array is a sub-array with
# two elements; time, price
# time = data[0]
# price = data[1]
 buy = []; sell = [];
  array.each_with_index do |day,index|
    if(index >= array.length - 1) return
    time  = day[0];
    price = day[1];

    nextprice = array[index+1][1];
    if(price < nextprice) #the third element of the buy-signal is optional
      buy.push([time,price,index]);
    end
  end
  buy.each do |buySignal|
    buyIndex = buySignal[2];
    boughtPrice = buySignal[1];
    sellTime;
    array.each_with_index do |day,index|
      price    = array[i][1];
      sellTime = array[i][0];
      if(price > boughtPrice){#third element of the sell-signal is optional
        sell.push([sellTime,price,buyIndex]);
        break
      end
    end
  end #the return / output of the function bust be an object with two keys;
  # buy & sell
  buySellSignals = {buy: buy, sell: sell};
  return buySellSignals;
end