/**
 * 计算最优购买股票算法
 * 
 * @param {array} stockList
 * 
 * @return {object} {start: startIndex, end: endIndex}
 */
export function caculateBestBuyInOut (stockList = []) { 
  
  if (stockList.length <= 2) {
    return {
      start: 0,
      end: stockList.length === 2 && stockList[0] - stockList[1] > 0 ? 1 : 0
    }
  }
 
  let startIndex = 0
  let endIndex = startIndex + 1
  let maxTmpPrice = stockList[endIndex] - stockList[startIndex]
  
  for (let i = startIndex, len = stockList.length; i < len; i++) {
    let tmpPrice = 0
    for (let j = startIndex + 1; j < len; j++) {
      tmpPrice = stockList[j] - stockList[startIndex]
      if (tmpPrice > maxTmpPrice) {
        endIndex = j
        maxTmpPrice = tmpPrice
      }
    }
    for (let k = startIndex + 1 ; k < endIndex; k++) {
      if (stockList[startIndex] > stockList[k]) {
        startIndex = k
      }
    }
  }

  return {
    start: startIndex,
    end: endIndex
  }
}

