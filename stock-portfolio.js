
export class ShareSaleException extends Error {
  constructor(message) {
    super(message);
    this.name = "ShareSaleException: selling more than owned";
  }
}
export default class StockPortfolio {
  constructor(startingStocks = []) {
    this.stocks = new Map(startingStocks);
  }

  addStock(stock, amount) {
    this.stocks.set(stock, this.stocks.get(stock) + amount || amount);
  }

  removeStock(stock, amount) {
    if(this.stocks.has(stock)){
      this.stocks.set(stock, this.stocks.get(stock) - amount);
      if(this.stocks.get(stock) < 0){
        throw new ShareSaleException();
      }
      if(this.stocks.get(stock) == 0){
        this.stocks.delete(stock);
      }
    };
  }

  getStocks() {
    return this.stocks;
  }

  getTotalValue() {
    let total = 0;
    this.stocks.forEach((stock) => {
      total += stock.getValue();
    });
    return total;
  }

  getStockShares(stock) {
    return this.stocks.get(stock);
  }
  getUniqueStocksCount() {
    let stocks =[...this.stocks.keys()];

    return stocks.length;
  }
}

