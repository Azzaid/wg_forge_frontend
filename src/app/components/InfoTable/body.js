import * as $ from "jquery";
import orders from '../../../../data/orders.json'

export default function getBody () {
  const ordersData = JSON.parse(orders);
  
  let tableBody = $("<tbody></tbody>");
  
  ordersData.forEach(order => {
  
  });
  
  return tableBody;
}