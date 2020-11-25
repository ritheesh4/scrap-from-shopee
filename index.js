const services = require("./services");
const Shopee = require("./shopee");
const csv = require("csvtojson");

(async () => {
  const input = await csv().fromFile("./input.csv");
  const filename = `./output/output-shopee-${services.getDate()}.csv`;
  services.createFile(filename);

  const urls = input.reduce((acc, row) => {
    const values = Object.values(row);
    return acc.concat(values);
  }, []);
  const log = services.initiateLog(urls.length);

  for (let url of urls) {
    const isValid = services.validateUrl(url);
    if (isValid) {
      const html = await services.getHtml(url);
      const shopee = Shopee(html, url);
      const product = shopee.getProduct();
      services.appendToFile(filename, product);
      log.increment({ title: product.Product_Name });
    } else {
      services.appendToFile(filename, null);
      log.increment({ title: "N.A" });
    }
  }
  log.stop();
  console.log("scrape finished !");
})();
