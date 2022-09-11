import { faker } from "@faker-js/faker";
const ROW_COUNT = 200;

const cols = [
  {
    id: "Symbol",
    width: 130,
    fn: () => faker.commerce.productName().substr(0, 4).toUpperCase(),
  },
  {
    id: "Sparkline",
    width: 200,
    fn: faker.name.fullName,
  },
  {
    id: "Name",
    width: 220,
    fn: () => faker.commerce.productName(),
  },
  {
    id: "52-Week Low",
    width: 120,
    fn: () => faker.commerce.price(0, 200, 2, "$"),
  },
  {
    id: "52-Week High",
    width: 120,
    fn: () => faker.commerce.price(200, 400, 2, "$"),
  },
  {
    id: "Price",
    width: 120,
    fn: () => faker.commerce.price(10, 200, 2, "$"),
  },
  {
    id: "Today % Change",
    width: 150,
    fn: () => faker.commerce.price(0, 100, 2) + "%",
  },
  {
    id: "Today’s Volume",
    width: 150,
    fn: () => faker.commerce.price(1000, 1000000, 0),
  },
  {
    id: "Market Cap",
    width: 180,
    fn: () => faker.commerce.price(100, 1000, 0),
  },
  {
    id: "Earnings Date",
    width: 150,
    fn: faker.name.fullName,
  },
  {
    id: "Relative Volume",
    width: 150,
    fn: () => faker.commerce.price(100, 1000, 0),
  },
  {
    id: "Dividend Date",
    width: 150,
    fn: faker.name.fullName,
  },
  {
    id: "Analyst Ratings",
    width: 150,
    fn: faker.name.fullName,
  },
  {
    id: "Analyst Price Target",
    fn: faker.name.fullName,
  },
  {
    id: "Average Volume",
    fn: faker.name.fullName,
  },
  {
    id: "Stocks I own",
    fn: faker.name.fullName,
  },
  {
    id: "Dividend Amount",
    fn: faker.name.fullName,
  },
  {
    id: "Shares outstanding",
    fn: faker.name.fullName,
  },
  {
    id: "Average Daily Bid/Ask Spread",
    fn: faker.name.fullName,
    width: 180,
  },
  {
    id: "Dividend Yield",
    fn: faker.name.fullName,
  },
  {
    id: "Equities with Options Volume",
    fn: faker.name.fullName,
    width: 180,
  },
  {
    id: "Relative Strength Index",
    fn: faker.name.fullName,
    width: 180,
  },
  {
    id: "Implied Volatility",
    fn: faker.name.fullName,
    width: 180,
  },
  {
    id: "Robinhood Data Filters",
    fn: faker.name.fullName,
    width: 180,
  },
  {
    id: "Price to Earnings Ratio",
    fn: faker.name.fullName,
    width: 180,
  },
  {
    id: "Net Profit Margin",
    fn: faker.name.fullName,
  },
  {
    id: "Annual Revenue Growth",
    width: 200,
    fn: faker.name.fullName,
  },
  {
    id: "Sector",
    width: 180,
    fn: faker.name.fullName,
  },
];

// Generate some sample test data
export const getData = () => {
  let rows = [];
  for (let i = 0; i < ROW_COUNT; i++) {
    let row = {};
    for (let j = 0; j < cols.length; j++) {
      if (cols[j].fn) {
        row[cols[j].id] = cols[j].fn();
      } else {
        row[cols[j].id] = faker.name.findName();
      }
    }
    rows.push(row);
  }
  return rows;
};
