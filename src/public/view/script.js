(async function re() {
  const user2fa = get2faUserInLocalStorage();
  console.log(user2fa);
  if (user2fa) {
    $("#2fa").addClass("display-none");
  }
})();

$(document).ready(function () {});
