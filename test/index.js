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
.catch(console.log);

readAsBuffer(new Counter(), 1e4)
.then(console.log)
.catch(e => {
	assert(e.message.includes('too large'));
});

const s='test';

readAsBuffer(s)
.then(x => assert.equal(x, s))
.catch(console.log);


const b=Buffer.from('ef26', 'hex');

readAsBuffer(b)
.then(x => assert.equal(x.compare(b), 0))
.catch(console.log);