import * as $ from "jquery";

export default function getCurrencyChooseSection (currencyRatesData, choosenCurrency, handleCurrencySelect) {
  let select = $("<select class=\"form-control\">").change(function() {
    console.log("SELECTED", select.val());
    handleCurrencySelect(select.val());
  });
  
  Object.keys(currencyRatesData).forEach(currencyAbbreviation => {
    select.append($("<option>").text(currencyAbbreviation))
  });
  
  return $("<tfoot>").append($("<tr></tr>")
    .append($("<td>Currency choose</td>").attr("colspan", "3"))
    .append($("<td>").attr("colspan", "4").append(select))
  )
};