const fs = require("fs");
const UserAgent = require("user-agents");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

function createFile(path) {
  fs.writeFileSync(
    path,
    "TITLE, CATEGORY, BRAND, PRICE, DISCOUNT, PROMOTION, SOLD BY, POSITIVE SELLER RATING, RATING, 5 STAR RATING COUNT, 4 STAR RATING COUNT, 3 STAR RATING COUNT, 2 STAR RATING COUNT, 1 STAR RATING COUNT, AVAILABILITY"
  );
}

function appendToFile(filePath, data) {
  let fileText = "\n";
  const values = Object.values(data);
  values.forEach((value) => {
    fileText += `"${value}",`;
  });

  fs.appendFileSync(filePath, fileText, { encoding: "utf8" });
}

async function getHtml(url) {
  //const browser = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const userAgent = new UserAgent();
  await page.setUserAgent(userAgent.toString());
  //page.setDefaultNavigationTimeout(0);
  await page.goto(url, { timeout: 0 });

  const html = await page.content();
  await browser.close();
  return html;
}

module.exports = { appendToFile, getHtml, createFile };
