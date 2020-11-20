const services = require("./services");
const Shopee = require("./shopee");
const csv = require("csvtojson");

(async () => {
  const input = await csv().fromFile("./input.csv");
  const filename = `./output/output-shopee-${services.getDate()}.csv`;
  services.createFile(filename);

  for (let item of input) {
    const url = item.shopee;
    const isValid = services.validateUrl(url);
    if (isValid) {
      const html = await services.getHtml(url);
      const shopee = Shopee(html, url);
      const product = shopee.getProduct();
      services.appendToFile(filename, product);
      const delay = 30 * 1000; // 2 minutes
      await new Promise((resolve) => setTimeout(resolve, delay));
    } else {
      services.appendToFile(filename, null);
    }
  }

  console.log("scrape finished !");
})();
