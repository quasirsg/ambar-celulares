const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

const secret = speakeasy.generateSecret({
  name: "WeareDevs",
});

qrcode.toDataURL(secret.otpauth_url, function (err, data) {
  console.log(data);
});
