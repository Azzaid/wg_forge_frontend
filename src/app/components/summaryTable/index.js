import * as $ from "jquery";

export default function getSummaryTable (transactionsData, usersData, companiesData) {
  let orderRow = $("<tr></tr>").attr('id', `order_${order.id}`);

  orderRow.append($("<td>").text(order.transaction_id));
};