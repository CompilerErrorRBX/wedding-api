const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const scraper = async (source) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.goto(source, {
  //   waitUntil: ['load', 'networkidle0']
  // });

  // const registry = await page.evaluate(() => {
  //   return {
  //     items: Array.from(document.body.getElementsByClassName('productRow')).map((item) => {
  //       return {
  //         quantity: +item.querySelector('.purchase .columnHead').innerText.trim(),
  //         desiredQuantity: +item.querySelector('.requested .columnHead').innerText.trim(),
  //         url: '',
  //         name: item.querySelector('.productName .prodTitle').innerText.trim(),
  //         price: item.querySelector('.price .rlpPrice').innerText.trim(),
  //         thumbnail: `https:${item.querySelector('.productImage img').getAttribute('src')}`,
  //       };
  //       // return {
  //       //   quantity: +quickView.getAttribute('data-qtypurchased'),
  //       //   desiredQuantity: +quickView.getAttribute('data-qtyrequested'),
  //       //   url: `https://www.bedbathandbeyond.com${quickView.getAttribute('href')}`,
  //       //   name: item.querySelector('.productName .prodTitle').innerText.trim(),
  //       //   price: item.querySelector('.price .rlpPrice').innerText.trim(),
  //       //   thumbnail: `https:${item.querySelector('.productImage a img').getAttribute('src')}`,
  //       // }
  //     }),
  //   };
  // });

  // await browser.close();

  // const items = [];

  // console.log('Querying BBB')

  const itemsPromise = new Promise((resolve) => {
    page.on('response', async (response) => {
      if (response.url().indexOf('https://www.bedbathandbeyond.com') > -1) {
        console.log('Response ' + response.url());
      }
    });

    page.on('request', async (response) => {
      if (response.url().indexOf('https://www.bedbathandbeyond.com') > -1) {
        console.log('Request ' + response.url());
      }
    });

    page.on('pageerror', async (response) => {
      console.log('Error ' + response);
    });

    page.waitForResponse(response => response.url().indexOf('https://www.bedbathandbeyond.com/apis/') > -1).then(async (response) => {
      const result = await response.json();
      console.log(result);
      if (result.data.remainingCategoryBuckets) {
        for (let l = 0; l < result.data.remainingCategoryBuckets.length; l++) {
          const bucket = result.data.remainingCategoryBuckets[l];
          for (let i = 0; i < bucket.length; i++) {
            const item = bucket[i];
            const itemModel = {
              url: `https://www.bedbathandbeyond.com${item.productUrl}`,
              thumbnail: `https://b3h2.scene7.com/is/image/BedBathandBeyond/${item.sKUDetailVO.skuImages.largeImage}`,
              name: item.sKUDetailVO.displayName,
              price: item.formattedPrice,
              quantity: +item.qtyPurchased,
              desiredQuantity: +item.qtyRequested,
            };

            items.push(itemModel);
          }
        }

        resolve({ items });

        await page.close().catch(err => console.log(err));
        await browser.close().catch(err => console.log(err));
      }
    }).catch(err => console.error(err));
  });

  await page.goto(source, { waitUntil: "networkidle2" }).catch(err => console.log(err));

  // await page.goto(source).catch(err => console.log(err));

  return itemsPromise;
};

// console.log(scraper('https://www.bedbathandbeyond.com/store/giftregistry/view_registry_guest.jsp?pwsToken=&eventType=Wedding&inventoryCallEnabled=true&registryId=544866195&pwsurl=&searchParam=Noah%20Galey'));

module.exports = scraper;
