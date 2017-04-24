
const readAsBuffer = (s, maxsize=1e7) =>
	new Promise((resolve, reject) => {
		const bufs = [];
		let size = 0;
		s.on('data', d => {
			bufs.push(d);
			size += d.length;
			if (size > maxsize) {
				const err = new Error(`File too large, max: ${maxsize} B`);
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