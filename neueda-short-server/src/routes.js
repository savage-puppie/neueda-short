const mongoose = require('mongoose');
const Shortener = require('./Shortener');
const myShortener = new Shortener();
const Url = mongoose.model('Url');
const serializers = require('./serializers');

module.exports = app => {
  /**
    * Returns the long URL for a given :hash
    */
  app.get('/api/:hash', async (req, res) => {
    const id = req.params.hash;
    const doc = await Url.findOne({ _id: id });

    return (doc) ? res.json({ url: doc.url }) : res.status(404);
  });

  /**
    * Redirects the request to the corresponding long URL of the given :hash
    */
  app.get('/:hash', async (req, res) => {
    const id = req.params.hash;
    const doc = await Url.findOne({ _id: id });

    if (doc) {
      res.redirect(doc.url);
    }
  });

  /**
    * Shorten a given URL
    */
  app.post('/api/shorten', async (req, res) => {
    try {
      const item = await myShortener.shorten(req.body ? req.body.url : '');

      return res.status(200).json(serializers.shortened(item));
    } catch (e) {
      return res.status(401).json({ success: false, error: e });
    }
  });
};
