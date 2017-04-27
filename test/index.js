const readAsBuffer = require('../');
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


readAsBuffer(new Counter())
.then(buf => {
	assert.equal(buf.length, 1e5);
})
.catch(e => console.log);

readAsBuffer(new Counter(), 1e4)
.then(console.log)
.catch(e => {
	assert(e.message.includes('too large'));
});