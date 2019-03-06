import * as $ from "jquery";

export default function getCurrencyChooseSection (currencyRatesData, choosenCurrency) {
  let select = $("<select class=\"form-control\">").change(function() {
    console.log("SELECTED", this.value());
  });
  
  Object.keys(currencyRatesData).forEach(currencyAbbreviation => {
    select.append($("<option>").text(currencyAbbreviation))
  });
  
  return $("<tr></tr>")
    .append($("<td>Currency choose</td>").attr("colspan", "3"))
    .append($("<td>").attr("colspan", "4").append(select))
};