const services = require("./services");
const Lazada = require("./lazada");
const csv = require("csvtojson");

(async () => {
  const input = await csv().fromFile("./input.csv");
  const filename = `./output/output-${Date.now()}.csv`;
  services.createFile(filename);

  for (let item of input) {
    const html = await services.getHtml(item.lazada);
    const lazada = Lazada(html);
    const product = lazada.getProduct();
    services.appendToFile(filename, product);

    const delay = 90 * 1000; // 1 min 30 sec
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  console.log("scrape finished !");
})();
