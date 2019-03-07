import * as $ from "jquery";

import getRow from './row.js';

export default function getBody (transactionsData, usersData, companiesData, currencyRatesData, choosenCurrency) {
  let tableBody = $("<tbody></tbody>");
  
  if (!transactionsData.length) {
    tableBody.append(
      $("<tr>").append(
        $("<td>Nothing found</td>").attr("colspan", "7")
      )
    );
  } else {
    transactionsData.forEach(order => {
      tableBody = tableBody.append(getRow(order, usersData, companiesData, currencyRatesData, choosenCurrency));
    });
  }
  
  return tableBody;
}