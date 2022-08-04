let user;
let data;
let secret;

(async function re() {
  user = await get2faUser();
  data = user.data;
  secret = data.secret;
  const url = await generateQr(secret.otpauth_url);
  $("#qr-img").attr("src", url);
})();

const codesInput = document.getElementById("codes");
const form = document.getElementById("verify-code");

form.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    const token = codesInput.value;

    const verified = await verifyUser(data.id, token);

    if (verified) {
      save2faUserInLocalStorage(data.id);
    }
  } catch (error) {
    console.log(error);
  }
});
$(document).ready(function () {});
