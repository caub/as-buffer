
const readAsBuffer = (s, maxsize=1e7) =>
	new Promise((resolve, reject) => {
		if (s instanceof Buffer || typeof s == 'string') {
			return resolve(Buffer.from(s));
		}
		if (Array.isArray(s)) {
			return resolve(Buffer.concat(s.map(Buffer.from)));
		}

		const bufs = [];
		let size = 0;
		s.on('data', d => {
			bufs.push(d);
			size += d.length;
			if (size > maxsize) {
				const err = new Error(`File too large, max: ${Math.round(maxsize/1000)}kB`);
				err.status = 413;
				return reject(err);
			}
		});

		s.on('end', onEnd);
		s.on('close', onEnd);
		s.on('error', onEnd);

		function onEnd(err) {
			if (err) reject(err);
			else resolve(Buffer.concat(bufs));
		}
		
	});

module.exports = readAsBuffer;