const cheerio = require("cheerio");

const Shopee = (html, url) => {
  const $ = cheerio.load(html);

  /**
   * A fuction which returns Product details
   * @function getProduct
   * @returns {object} - returns a JSON object
   */
  const getProduct = () => {
    const product = {};

    // link
    product["link"] = url;
    product["Product Name"] = $("div[class=qaNIZv]")
      .find("span")
      .first()
      .text();
    product["Brand"] = $("a[class=_2H-513]")
      .first()
      .text();

    product["Price"] = $("div[class=_3n5NQx]")
      .first()
      .text();

    product["Warranty type"] = $("div[class=_3n5NQx]")
      .first()
      .text();
    console.log(product)


    // const breadcrumb = $("ul[class=breadcrumb]").children();
    // // title
    // product["title"] = $(breadcrumb[breadcrumb.length - 1])
    //   .find("span.breadcrumb_item_text > span")
    //   .text();

    // // category
    // product["category"] = $(breadcrumb[breadcrumb.length - 2])
    //   .find("a > span")
    //   .text();

    // // brand
    // product["brand"] = $(  "div[class=pdp-product-brand]")
    //   .find("a")
    //   .first()
    //   .text();

    // // price
    // product["price"] = $("div[class=pdp-product-price]")
    //   .find("span")
    //   .first()
    //   .text();

    // // discount
    // product["discount"] = $("div[class=pdp-product-price] > div")
    //   .find("span")
    //   .last()
    //   .text();

    // // promotion
    // product["promotion"] = $("div.promotion-tag-item > div").text();

    // // soldBy
    // product["seller"] = $("div.seller-name__detail > a").first().text();

    // // seller info
    // const sellerInfo = $("div[class=pdp-seller-info-pc]").children();
    // product["positiveSellerRating"] = $(sellerInfo[0]).children().last().text();
    // product["shipOnTime"] = $(sellerInfo[1]).children().last().text();
    // product["chatResponseRate"] = $(sellerInfo[2]).children().last().text();

    // // authenticity
    // const isAuthentic = $("div[class=delivery-option-item__info]")
    //   .find("div.delivery-option-item__title")
    //   .text()
    //   .trim();
    // product["authenticity"] =
    //   isAuthentic === "100% Authentic" ? isAuthentic : "";

    // // Warranty
    // product["warrantyType"] = "";
    // product["warrantyPeriod"] = "";
    // $("div[class=pdp-general-features] > ul")
    //   .children()
    //   .each((i, elem) => {
    //     const key = $(elem).find("span").text().trim();
    //     if (key === "Warranty Type") {
    //       product["warrantyType"] = $(elem).find("div.key-value").text();
    //     } else if (key === "Warranty Period") {
    //       product["warrantyPeriod"] = $(elem).find("div.key-value").text();
    //     }
    //   });

    // // Standard delivery
    // product["standardDeliveryTime"] = $("div[class=delivery]")
    //   .find("div[class=delivery-option-item__time]")
    //   .text();
    // product["shippingCost"] = $("div[class=delivery]")
    //   .find("div[class=delivery-option-item__shipping-fee]")
    //   .text();

    // // rating
    // product["rating"] = $("div.mod-rating").find("span.score-average").text();

    // // rating count
    // const ratingList = $("div.mod-rating").find("div.detail > ul").children();
    // product["fiveStarRatingCount"] = $(ratingList[0])
    //   .find("span.percent")
    //   .text();

    // product["fourStarRatingCount"] = $(ratingList[1])
    //   .find("span.percent")
    //   .text();

    // product["threeStarRatingCount"] = $(ratingList[2])
    //   .find("span.percent")
    //   .text();

    // product["twoStarRatingCount"] = $(ratingList[3])
    //   .find("span.percent")
    //   .text();

    // product["oneStarRatingCount"] = $(ratingList[4])
    //   .find("span.percent")
    //   .text();

    // // product availability
    // const isAvailable = $("*").is("button.add-to-cart-buy-now-btn");
    // product["availability"] = isAvailable;
    console.log(product)
    return product;
  };

  return { getProduct };
};

module.exports = Shopee;
