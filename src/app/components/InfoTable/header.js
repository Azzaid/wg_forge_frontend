import * as $ from "jquery";

export default function getHeader (sortHandler, sortedBy) {
  let tableHeader = $("<tr>");
  tableHeader.append(
    $("<th>Transaction ID</th>").addClass("cursor-pointer").click(()=> {sortHandler('Transaction ID')}).append(
      $(`${sortedBy === 'Transaction ID' ? "<span>&#8595;</span>" : "null"}`)
    )
  );
  tableHeader.append(
    $("<th>User Info</th>").addClass("cursor-pointer").click(()=> {sortHandler('User Info')}).append(
      $(`${sortedBy === 'User Info' ? "<span>&#8595;</span>" : "null"}`)
    )
  );
  tableHeader.append(
    $("<th>Order Date</th>").addClass("cursor-pointer").click(()=> {sortHandler('Order Date')}).append(
      $(`${sortedBy === 'Order Date' ? "<span>&#8595;</span>" : "null"}`)
    )
  );
  tableHeader.append(
    $("<th>Order Amount</th>").addClass("cursor-pointer").click(()=> {sortHandler('Order Amount')}).append(
      $(`${sortedBy === 'Order Amount' ? "<span>&#8595;</span>" : "null"}`)
    )
  );
  tableHeader.append(
    $("<th>Card Number</th>")
  );
  tableHeader.append(
    $("<th>Card Type</th>").addClass("cursor-pointer").click(()=> {sortHandler('Card Type')}).append(
      $(`${sortedBy === 'Card Type' ? "<span>&#8595;</span>" : "null"}`)
    )
  );
  tableHeader.append(
    $("<th>Location</th>").addClass("cursor-pointer").click(()=> {sortHandler('Location')}).append(
      $(`${sortedBy === 'Location' ? "<span>&#8595;</span>" : "null"}`)
    )
  );
  
  return $("<thead></thead>").addClass('thead-light').append(tableHeader);
}