const puppeteer = require('puppeteer');

const scraper = async (source) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(source, {
    waitUntil: ['load', 'networkidle0']
  });

  const registry = await page.evaluate(() => {
    return {
      items: Array.from(document.body.getElementsByClassName('productRow')).map((item) => {
        const quickView = item.querySelector('.quickViewLink a');
        if (!quickView) {
          return {
            quantity: +item.querySelector('.purchase .columnHead').innerText.trim(),
            desiredQuantity: +item.querySelector('.requested .columnHead').innerText.trim(),
            url: '',
            name: item.querySelector('.productName .prodTitle').innerText.trim(),
            price: item.querySelector('.price .rlpPrice').innerText.trim(),
            thumbnail: `https:${item.querySelector('.productImage img').getAttribute('src')}`,
          };
        }
        return {
          quantity: +quickView.getAttribute('data-qtypurchased'),
          desiredQuantity: +quickView.getAttribute('data-qtyrequested'),
          url: `https://www.bedbathandbeyond.com${quickView.getAttribute('href')}`,
          name: item.querySelector('.productName .prodTitle').innerText.trim(),
          price: item.querySelector('.price .rlpPrice').innerText.trim(),
          thumbnail: `https:${item.querySelector('.productImage a img').getAttribute('src')}`,
        }
      }),
    };
  });

  await browser.close();

  return registry;
};

// console.log(scraper('https://www.bedbathandbeyond.com/store/giftregistry/view_registry_guest.jsp?pwsToken=&eventType=Wedding&inventoryCallEnabled=true&registryId=544866195&pwsurl=&searchParam=Noah%20Galey'));

module.exports = scraper;
