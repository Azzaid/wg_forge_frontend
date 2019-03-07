import * as $ from "jquery";
import moment from "moment";

import getUserInfo from './userInfo.js'

export default function getRow (order, usersData, companiesData, currencyRatesData, choosenCurrency) {
  let orderRow = $("<tr></tr>").attr('id', `order_${order.id}`);

  orderRow.append($("<td>").text(order.transaction_id));
  orderRow.append($("<td>").addClass("user_data").append(getUserInfo(usersData[order.user_id], companiesData[order.user_id])));
  orderRow.append($("<td>").text(moment(order.created_at, "x").format("DD/MM/YYYY hh:mm:ss")));
  
  const currencySymbol = choosenCurrency ? choosenCurrency : '$';
  const conwertedTotal = choosenCurrency ? (order.total / currencyRatesData.USD * currencyRatesData[choosenCurrency]).toFixed(2) : order.total;
  
  orderRow.append($("<td>").text(`${currencySymbol} ${conwertedTotal}`));
  orderRow.append($("<td>").text(`${order.card_number.slice(0,2)}********${order.card_number.slice(-4)}`));
  orderRow.append($("<td>").text(order.card_type));
  orderRow.append($("<td>").text(`${order.order_country} ${order.order_ip}`));

  return orderRow;orderRow.append($("<td>").text(`${choosenCurrency ? '$' : choosenCurrency} ${order.total}`));
}