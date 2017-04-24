const readAsBuffer = require('../');
const assert = require('assert');
const {Readable} = require('stream');

class Counter extends Readable {
	constructor(opt) {
		super(opt);
		this._max = 100000;
		this._index = 1;
	}

	_read() {
		var i = this._index++;
		if (i > this._max)
			this.push(null);
		else {
			var str = '' + i;
			var buf = Buffer.from(str, 'ascii');
			this.push(buf);
		}
	}
}


readAsBuffer(new Counter())
.then(buf => {
	assert(buf.length);
})
.catch(e => console.log);

readAsBuffer(new Counter(), 1e4)
.then(console.log)
.catch(e => {
	assert(e.message.includes('too large'));
});