const puppeteer = require('puppeteer');

const scraper = async (source) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const items = [];

  setTimeout(async () => {
    await page.close(true);
    await browser.close();
  }, 10000);

  const itemsPromise = new Promise((resolve) => {
    page.on('response', async response => {
      if (response.request().url().indexOf('https://api.target.com/registries/v1') > -1) {
        const result = await response.json();
        if (result.registries) {
          for (let i = 0; i < result.registries.items.length; i++) {
            const item = result.registries.items[i];
            const attr = item.item_attributes[0];
            const itemModel = {
              url: attr.pdp_link,
              thumbnail: attr.images.external_primary[0],
              name: attr.description.online_description,
              price: attr.price.online_offer_formatted_price,
              quantity: +item.purchased_quantity,
              desiredQuantity: +item.requested_quantity,
            };
            items.push(itemModel);
          }

          resolve({ items });

          await page.close(true);
          await browser.close();
        }
      }
    });
  });

  await page.goto(source);

  return itemsPromise;
};

// scraper('https://www.target.com/gift-registry/giftgiver?registryId=ecc877b0bc144339a4338f49f61529a6&type=WEDDING').then((items) => {
//   console.log(items);
// });

module.exports = scraper;
