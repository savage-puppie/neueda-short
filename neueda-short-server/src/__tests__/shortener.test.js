/* eslint-env jest */

const Shortener = require('../Shortener');
const timeoutForAsync = 10000;

it("gets an object from shortener with a short 'property'",
  async () => expect(await (new Shortener()).shorten('google.com', false)).toHaveProperty('short'), timeoutForAsync);
it('throws an error when try to shorten a non url',
  async () => expect((new Shortener()).shorten('notadomain', false)).rejects.toMatch("The URL you typed is not a valid URL"), timeoutForAsync);
