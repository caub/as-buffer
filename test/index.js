const read = require('../');
const assert = require('assert');
const {Readable} = require('stream');

class Counter extends Readable {
	constructor(opt) {
		super(opt);
		this._max = 1e5;
		this._index = 0;
	}

	_read() {
		this.push(++this._index > this._max ? null : '5');
	}
}

(async () => {

	console.log('  - read Stream');
	const buf1 = await read(new Counter());
	assert.equal(buf1.length, 1e5);

	try {
		const buf2 = await read(new Counter(), 1e4);
	}
	catch(e) {
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
