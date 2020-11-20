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

    //1. Product category
    product["Product_Category"] = $("a[class=JFOy4z]").last().text()

    //2. Product name
    product["Product_Name"] = $("div[class=qaNIZv]")
      .find("span")
      .first()
      .text();

    //3. Brand name
    product["Brand"] = $("a[class=_2H-513]")
      .first()
      .text();

    //4. Best before   
    const BestBeforeLabel = $("div[class=_2aZyWI]").find("div").eq(3).find('label').text()
    if (BestBeforeLabel === 'Best Before') {
      product["Best_Before"] = $("div[class=_2aZyWI]").find("div").eq(3).find('div').text()
    } else {
      product["Best_Before"] = ''
    }

    //5. Stock available
    $("div[class=_2aZyWI]")
      .children()
      .each((i, elem) => {
        const key = $(elem).find("label").text().trim();
        if (key === "Stock") {
          product["Stock_available"] = $(elem).find("div").text();
        }
      })

    //6. Price
    product["Price"] = $("div[class=_3n5NQx]")
      .first()
      .text();

    //7. Discount
    product["Discount"] = $("div[class=MITExd]").text()
    
    //8. 

    //10. Rating count    
    product["Ratings_count"] = $("div.flex.M3KjhJ").first().text()

    //11. Number of ratings
    product["#_of_ratings"] = $("div[class=_3Oj5_n]").text()

    //12. Sold
    product["Sold"] = $("div[class=_22sp0A]").text()

    //14. Shipping fee  
     product["Shipping_fee"] = $("div.flex.items-center.BtHdNz").first().text()

    //14. Shop ratings
    product["Shop_Ratings"] = $("div[class=_3mK1I2]").find('span').first().text()

    //15.1 Products count
    product["Products_count"] = $("div[class=_3mK1I2]").find('span').eq(1).text()
    
    //15.2 Response rate
    product["Response_rate"] = $("div[class=_3mK1I2]").find('span').eq(2).text()

    //15.3 Reponse Time
    product["Response_Time"] = $("div[class=_3mK1I2]").find('span').eq(3).text()

    //15.4 Followers
    product["Followers"] = $("div[class=_3mK1I2]").find('span').eq(5).text()

    //15.5 Shop voucherUntitled Document 1
    product["Shop_voucher"] = $("span.voucher-promo-value").text()

    console.log(product)
    return product;
  };

  return { getProduct };
};

module.exports = Shopee;
