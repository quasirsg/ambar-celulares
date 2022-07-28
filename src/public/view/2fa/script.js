(async function re() {
  const url = await generateQr();

  $("#qr-img").attr("src", url);
})();

$(document).ready(function () {});
