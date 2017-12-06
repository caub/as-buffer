const readAsBuffer = (s, maxsize = 1e7) =>
	new Promise((resolve, reject) => {
		if (Buffer.isBuffer(s) || Array.isArray(s) || typeof s === 'string') {
			return resolve(Buffer.from(s));
		}

		const bufs = [];
		let size = 0;
		s.on('data', d => {
			bufs.push(d);
			size += d.length;
			if (size > maxsize) {
				const err = new Error(`File too large, max: ${Math.round(maxsize/1000)}kB`);
				err.status = 413;
				reject(err);
			}
		});

		s.on('end', onEnd);
		s.on('close', onEnd);
		s.on('error', onEnd);

		function onEnd(err) {
			if (err) {
				return reject(err);
			}
			resolve(s._readableState && s._readableState.objectMode ? bufs : Buffer.concat(bufs));
		}
	});

module.exports = readAsBuffer;
