module.exports = (data: string, compression?: 'gzip' | 'brotli' | 'raw') =>
  compression === 'gzip' || compression === 'brotli'
    ? require(`${compression}-size`).sync(data) // eslint-disable-line
    : Buffer.byteLength(data);
