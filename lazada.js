const cheerio = require("cheerio");

const Lazada = (html) => {
  const $ = cheerio.load(html);

  /**
   * A fuction which returns Product details
   * @function getProduct
   * @returns {object} - returns a JSON object
   */
  const getProduct = () => {
    const product = {};

    const breadcrumb = $("ul[class=breadcrumb]").children();

    // title
    product["title"] = $(breadcrumb[breadcrumb.length - 1])
      .find("span.breadcrumb_item_text > span")
      .text();

    // category
    product["category"] = $(breadcrumb[breadcrumb.length - 2])
      .find("a > span")
      .text();

    // brand
    product["brand"] = $("div[class=pdp-product-brand]")
      .find("a")
      .first()
      .text();

    // price
    product["price"] = $("div[class=pdp-product-price]")
      .find("span")
      .first()
      .text();

    // discount
    product["discount"] = $("div[class=pdp-product-price] > div")
      .find("span")
      .last()
      .text();

    // promotion
    product["promotion"] = $("div.promotion-tag-item > div").text();

    // soldBy
    product["soldBy"] = $("div.seller-name__detail > a").first().text();

    // positive seller rating
    product["positiveSellerRating"] = $("div[class=pdp-seller-info-pc] > div")
      .first()
      .children()
      .last()
      .text();

    // rating
    product["rating"] = $("div.mod-rating").find("span.score-average").text();

    // rating count
    const ratingList = $("div.mod-rating").find("div.detail > ul").children();
    product["fiveStarRatingCount"] = $(ratingList[0])
      .find("span.percent")
      .text();

    product["fourStarRatingCount"] = $(ratingList[1])
      .find("span.percent")
      .text();

    product["threeStarRatingCount"] = $(ratingList[2])
      .find("span.percent")
      .text();

    product["twoStarRatingCount"] = $(ratingList[3])
      .find("span.percent")
      .text();

    product["oneStarRatingCount"] = $(ratingList[4])
      .find("span.percent")
      .text();

    const isAvailable = $("*").is("button.add-to-cart-buy-now-btn");

    product["availability"] = isAvailable;

    return product;
  };

  return { getProduct };
};

module.exports = Lazada;
