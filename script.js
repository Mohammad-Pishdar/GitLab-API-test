const submitButton = $("#submit-button");
const private_token = config.private_token;

function findUsers() {
  let queryUrl = "https://gitlab.com/api/v4/users?" + private_token;
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
  // .then(() => {
  //   // console.log(usersArray);
  //   let i;
  //   let data = "ID, First Name, Last Name, Username, Email \n";
  //   for (i = 0; i < usersArray.length; i++) {
  //     let queryUrl = "https://gitlab.com/api/v4/users/" + usersArray[i];
  //     $.ajax({
  //       url: queryUrl,
  //       method: "GET",
  //     }).then(function (response) {
  //       // console.log(response);
  //       let nameStringArray = response.name.split(/(\s+)/);
  //       // console.log(nameStringArray[0], nameStringArray[2]);
  //       data +=
  //         response.id +
  //         ", " +
  //         nameStringArray[0] +
  //         ", " +
  //         nameStringArray[2] +
  //         ", " +
  //         response.username +
  //         ", " +
  //         response.public_email +
  //         "\n";
  //       console.log(data);
  //     });
  //   }
  // });
}

submitButton.on("click", function () {
  findUsers();
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
