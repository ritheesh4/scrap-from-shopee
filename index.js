const services = require("./services");
const Lazada = require("./lazada");
const csv = require("csvtojson");

(async () => {
  const input = await csv().fromFile("./input.csv");
  const filename = `./output/output-lazada-${services.getDate()}.csv`;
  services.createFile(filename);

  for (let item of input) {
    const url = item.lazada;
    const isValid = services.validateUrl(url);
    if (isValid) {
      const html = await services.getHtml(url);
      const lazada = Lazada(html, url);
      const product = lazada.getProduct();
      services.appendToFile(filename, product);
      console.log(product.title);
      const delay = 120 * 1000; // 2 minutes
      await new Promise((resolve) => setTimeout(resolve, delay));
    } else {
      services.appendToFile(filename, null);
    }
  }

  console.log("scrape finished !");
})();
