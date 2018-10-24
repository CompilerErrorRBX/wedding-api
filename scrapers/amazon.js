const puppeteer = require('puppeteer');

const scraper = async (source) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(source, {
    waitUntil: 'networkidle2'
  });

  const registry = await page.evaluate(() => {
    return {
      items: Array.from(document.getElementsByClassName('wr-product-grid-card-in-registry')).map((item) => {
        return {
          quantity: +item.getAttribute('data-wr-product-card-qty-purchased'),
          desiredQuantity: +item.getAttribute('data-wr-product-card-qty-needed'),
          url: `https://www.amazon.com${Array.from(item.getElementsByClassName('wr-product-grid-card-more-details'))[0].getAttribute('href')}`,
          name: Array.from(item.getElementsByClassName('wr-product-grid-card-title'))[0].innerText,
          price: Array.from(item.getElementsByClassName('wr-product-grid-card-price'))[0].innerText.trim(),
          thumbnail: Array.from(item.getElementsByTagName('img'))[0].getAttribute('src'),
        }
      }),
    };
  });

  await browser.close();

  return registry;
};

module.exports = scraper;
