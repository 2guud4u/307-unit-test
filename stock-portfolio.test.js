import StockPortfolio from "./stock-portfolio.js";
import { ShareSaleException } from "./stock-portfolio.js";


test("Testing empty stock portfolio", () => {
  const portfolio = new StockPortfolio();
  const expected = new Map();
  const result = portfolio.getStocks();
  expect(expected).toEqual(result);
})

test("Test no shares", () => {
  const portfolio = new StockPortfolio();
  const expected = 0;
  const result = portfolio.getTotalValue();
  expect(expected).toEqual(result);
})

test("test number of unique stocks", () => {
  const portfolio = new StockPortfolio([["AAPL", 10], ["GOOG", 20]]);
  const expected = 2;
  const result = portfolio.getUniqueStocksCount();
  expect(expected).toEqual(result);
})

test("buying shares with no original shares ", () => {
  const portfolio = new StockPortfolio();
  portfolio.addStock("AAPL", 10);
  const expected = 10;
  const result = portfolio.getStocks().get("AAPL");
  expect(expected).toEqual(result);
})

test("buying shares with original shares ", () => {
  const portfolio = new StockPortfolio([["AAPL", 10]]);
  portfolio.addStock("AAPL", 10);
  const expected = 20;
  const result = portfolio.getStocks().get("AAPL");
  expect(expected).toEqual(result);
});

test("selling shares with original shares ", () => {
  const portfolio = new StockPortfolio([["AAPL", 10]]);
  portfolio.removeStock("AAPL", 9);
  const expected = 1;
  const result = portfolio.getStocks().get("AAPL");
  expect(expected).toEqual(result);
});

test("stock shares", () => {
  const portfolio = new StockPortfolio([["AAPL", 10]]);
  const expected = 10;
  const result = portfolio.getStockShares("AAPL");
  expect(expected).toEqual(result);
});

test("only owned stocks should appear", () => {
  const portfolio = new StockPortfolio([["AAPL", 10], ["GOOG", 20]]);
  portfolio.removeStock("AAPL", 10);
  const expected = 1;
  const result = portfolio.getUniqueStocksCount();
  expect(expected).toEqual(result);
});

test("selling more than owned shares exception", () => {
  const portfolio = new StockPortfolio([["AAPL", 10]]);
  expect(() => {portfolio.removeStock("AAPL", 20)}).toThrow(ShareSaleException);
});