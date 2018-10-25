const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');

const db = require('../db/models');

const basename = path.basename(__filename);

const scrapers = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const scraper = require(`./${file}`);
    scrapers[file.substr(0, file.length - 3)] = scraper;
  });

db.registrySource.all().then((registries) => {
  for (let i = 0; i < registries.length; i++) {
    const registry = registries[i];
    schedule.scheduleJob('*/1 * * * *', async () => {
      const items = await scrapers[registry.store.toLowerCase()](registry.url);
      for (let j = 0; j < items.items.length; j++) {
        const item = items.items[j];
        item.registrySourceId = registry.id;
        const dbItem = await db.registryItem.findOrCreate({
          where: { url: item.url },
          defaults: item,
        });

        db.registryItem.update(item, { where: { id: dbItem.id } });
      }
      console.log('Ran scape of', registry.url);
    });
  }
});

module.exports = scrapers;
