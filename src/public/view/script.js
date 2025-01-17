(async function re() {
  const user2fa = get2faUserInLocalStorage();
  if (user2fa) {
    $("#2fa").addClass("display-none");
  }
})();

$(document).ready(function () { });
