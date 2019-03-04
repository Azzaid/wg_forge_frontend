import * as $ from "jquery";
import moment from "moment/moment";

export default function getUserInfo (user, company) {
  let userInfoField = $("<div>").addClass("user-details collapse");
  let userLink = $("<a>").attr("href", "#").text(`${user.gender === "Male" ? "Mr." : "Ms."} ${user.first_name} ${user.last_name}`)
    .click( (event) => {
      event.preventDefault();
      userInfoField.toggleClass("show");
    });

  userInfoField.append(
    $("<p>").text(`Birthday: ${user.birthday ? moment(user.birthday, "x").format("DD/MM/YYYY") : "Not provided"}`),
    $("<p>").append($("<img>").attr("src", `${user.avatar ? user.avatar : "none"}`).attr("width", "100px")),
  );

  if (company) {
    if (company.url) {
      userInfoField.append(
        $("<p>").text("Company: ").append($("<a>").attr("href", `${company.url ? company.url : ""}`).attr("target", "_blank").text(company.title)),
      );
    } else {
      userInfoField.append(
        $("<p>").text(`Company: ${company.title}`),
      );
    }

    userInfoField.append(
      $("<p>").text(`Industry: ${company.industry}`),
    );
  }

    return userLink.add(userInfoField);
}