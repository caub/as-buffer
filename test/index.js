const read = require('../');
const assert = require('assert');
const { Readable } = require('stream');

class GiveMeFive extends Readable {
	constructor(opts) {
		super(opts);
		this._max = opts && opts.max || 1e5;
		this._index = 0;
	}
	_read() {
		this.push(++this._index > this._max ? null : '5');
	}
}

(async () => {

	console.log('  - read Stream');
	const buf1 = await read(new GiveMeFive());
	assert.equal(buf1.length, 1e5);
	assert(!Array.isArray(buf1));

	console.log('  - read Stream as array');
	const arr1 = await read(new GiveMeFive(), { concat: false });
	assert(Array.isArray(arr1));
	assert.equal(arr1.length, 1e5);

	console.log('  - read Stream objectMode as array');
	const arr2 = await read(new GiveMeFive({ max: 100, objectMode: true }));
	assert(Array.isArray(arr2));
	assert.equal(arr2.length, 100);

	try {
		const buf2 = await read(new GiveMeFive(), { maxsize: 1e4 });
		assert(false); // shouldn't reach this
	}
	catch (e) {
		assert(e.message.includes('too large'));
	}

	console.log('  - read String');
	const s = 'test';
	const buf3 = await read(s);
	assert.equal(buf3, s);

	console.log('  - read Array');
	const a = [12, 45, 255, 560, 1, 1, 0];
	const buf4 = await read(a);
	assert.equal(buf4.toString(), Buffer.from(a));

	console.log('  - read Buffer');
	const buf5_ = Buffer.from('ef26', 'hex');
	const buf5 = await read(buf5_);
	assert.equal(buf5_.compare(buf5), 0);

})()
	.catch(console.error);
