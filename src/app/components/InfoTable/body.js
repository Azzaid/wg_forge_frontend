import * as $ from "jquery";

import getRow from './row.js';

export default function getBody (transactionsData, usersData, companiesData) {
  let tableBody = $("<tbody></tbody>");

  transactionsData.forEach(order => {
    tableBody = tableBody.append(getRow(order, usersData, companiesData));
  });
  
  return tableBody;
}