const shortid = require('shortid');
const validUrl = require('valid-url');
const mongoose = require('mongoose');

require('./models');

const Url = mongoose.model('Url');

class Shortener {
  // Saves a URL to the database. If it already exists then just returns it
  async save(url, code) {
    const item = await Url.findOne({ url });

    if (item) {
      return item;
    }

    const newItem = new Url({ _id: code, url });

    await newItem.save();

    return newItem;
  }

  async shorten(url, persist = true) {
    /* Prepend the protocol (http) if the URL doesn't have one.
       Https ones will be automatically upgraded by their servers */
    if (!url.startsWith('http')) {
      url = `http://${url}`;
    }

    // Checks whether the given @url is a valid URL
    if (!validUrl.isUri(url) || url.indexOf('.') === -1) {
      throw 'The URL you typed is not a valid URL';
    }

    try {
      const code = shortid.generate();
      let item = {};

      if (persist) {
        item = await this.save(url, code);
      } else {
        item = { short: code }
      }

      return item;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Shortener;
