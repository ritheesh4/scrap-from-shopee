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

    // Product category
    product["Product_Category"] = $("a[class=JFOy4z]").last().text()

    // Product name
    product["Product_Name"] = $("div[class=qaNIZv]")
      .find("span")
      .first()
      .text();

    // Brand name
    product["Brand"] = $("a[class=_2H-513]")
      .first()
      .text();

    // Best before   
    const BestBeforeLabel = $("div[class=_2aZyWI]").find("div").eq(3).find('label').text()
    if (BestBeforeLabel === 'Best Before') {
      product["Best_Before"] = $("div[class=_2aZyWI]").find("div").eq(3).find('div').text()
    } else {
      product["Best_Before"] = ''
    }

    // Stock available
    $("div[class=_2aZyWI]")
      .children()
      .each((i, elem) => {
        const key = $(elem).find("label").text().trim();
        if (key === "Stock") {
          product["Stock_available"] = $(elem).find("div").text();
        }
      })

    // Price
    product["Price"] = $("div[class=_3n5NQx]")
      .first()
      .text();

    //Rating count    
    product["Ratings_count"] = $("div.flex.M3KjhJ").first().text()

    // Number of ratings
    product["#_of_ratings"] = $("div[class=_3Oj5_n]").text()

    // Sold
    product["Sold"] = $("div[class=_22sp0A]").text()

    // Shipping fee  
     product["Shipping_fee"] = $("div.flex.items-center.BtHdNz").first().text()

    // Shoping ratings
    product["Shop_Ratings"] = $("div[class=_3mK1I2]").find('span').first().text()

    // Products count
    product["Products_count"] = $("div[class=_3mK1I2]").find('span').eq(1).text()
    
    // Response rate
    product["Response_rate"] = $("div[class=_3mK1I2]").find('span').eq(2).text()

    // Reponse Time
    product["Response_Time"] = $("div[class=_3mK1I2]").find('span').eq(3).text()

    // Followers
    product["Followers"] = $("div[class=_3mK1I2]").find('span').eq(5).text()
    
    // Shop voucher
    product["Shop_voucher"] = $("span.voucher-promo-value").text()



    // ("p:nth-child(3)")


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
