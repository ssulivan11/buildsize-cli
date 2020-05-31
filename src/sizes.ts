module.exports = (data: string, compression?: 'gzip' | 'brotli') =>
  compression ? require(`${compression}-size`).sync(data) : Buffer.byteLength(data); // eslint-disable-line
