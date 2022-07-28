const qrcode = require("qrcode");

async function generateUrl(secret) {
  return await qrcode.toDataURL(secret);
}

module.exports = { generateUrl };
