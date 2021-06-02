const projectId = $("#project-id");
const submitButton = $("#submit-button");

function findUsers(projectId) {
  let queryUrl = "https://gitlab.com/api/v4/projects/" + projectId + "/users";
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response.length);
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
    let i;
    let data = "ID, First Name, Last Name, Username \n";
    for (i = 0; i < response.length; i++) {
      //   console.log(response[i]);
      let nameStringArray = response[i].name.split(/(\s+)/);
      console.log(nameStringArray[0], nameStringArray[2]);
      data +=
        response[i].id +
        ", " +
        nameStringArray[0] +
        ", " +
        nameStringArray[2] +
        ", " +
        response[i].username +
        "\n";
    }
    fileName = `project${projectId}-user-info.csv`;
    saveData(data, fileName);
  });
}

submitButton.on("click", function () {
  let id = projectId.val();
  findUsers(id);
});
