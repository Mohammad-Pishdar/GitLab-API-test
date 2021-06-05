const searchbutton = $(".btn");
const inputForm = $(".form-control");

function findUsers(token) {
  let queryUrl = "https://gitlab.com/api/v4/users?private_token=" + token;
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    // console.log(response);
    let i;
    let data = "ID, First Name, Last Name, Username \n";
    for (i = 0; i < response.length; i++) {
      let nameStringArray = response[i].name.split(/(\s+)/);
      data +=
        response[i].id +
        ", " +
        nameStringArray[0] +
        ", " +
        nameStringArray[2] +
        ", " +
        response[i].username +
        ", " +
        "\n";
    }
    console.log(data);
    fileName = `user-info.csv`;
    saveData(data, fileName);
  });
}

searchbutton.on("click", function () {
  let token = inputForm.val();
  findUsers(token);
});

const saveData = (function () {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, fileName) {
    const blob = new Blob([data], { type: "octet/stream" }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();
