import * as $ from "jquery";

export default function getSearchRow (handleSearchStringInput) {

  let searchRow = $("<tr></tr>")
    .append($("<th>Search:</th>").attr("colspan", "3"))
    .append($("<th>").attr("colspan", "4").append(
      $("<input type=\"text\" id=\"search\">").on('change keyup paste', handleSearchStringInput)
    ));

  return searchRow;
};