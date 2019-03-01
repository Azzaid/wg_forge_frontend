import * as $ from "jquery";

export default function getHeader () {
  let tableHeader = $("<tr></tr>");
  tableHeader.append("<th>Transaction ID</th>");
  tableHeader.append("<th>User Info</th>");
  tableHeader.append("<th>Order Date</th>");
  tableHeader.append("<th>Order Amount</th>");
  tableHeader.append("<th>Card Number</th>");
  tableHeader.append("<th>Card Type</th>");
  tableHeader.append("<th>Location</th>");
  
  return $("<thead></thead>").append(tableHeader);
}