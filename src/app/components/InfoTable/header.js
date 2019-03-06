import * as $ from "jquery";

import getSearchRow from './searchRow'

export default function getHeader (sortHandler, sortedBy, handleSearchStringInput) {
  let tableHeader = $("<tr>");
  tableHeader.append(
    $("<th>Transaction ID</th>").addClass("cursor-pointer")
      .click(()=> {
      moveSortArrow('Transaction ID');
      sortHandler('Transaction ID');
    })
  );
  tableHeader.append(
    $("<th>User Info</th>").addClass("cursor-pointer")
      .click(()=> {
      moveSortArrow('User Info');
      sortHandler('User Info');
    })
  );
  tableHeader.append(
    $("<th>Order Date</th>").addClass("cursor-pointer")
      .click(()=> {
      moveSortArrow('Order Date');
      sortHandler('Order Date');
    })
  );
  tableHeader.append(
    $("<th>Order Amount</th>").addClass("cursor-pointer")
      .click(()=> {
      moveSortArrow('Order Amount');
      sortHandler('Order Amount');
    })
  );
  tableHeader.append(
    $("<th>Card Number</th>")
  );
  tableHeader.append(
    $("<th>Card Type</th>").addClass("cursor-pointer")
      .click(()=> {
      moveSortArrow('Card Type');
      sortHandler('Card Type');
    })
  );
  tableHeader.append(
    $("<th>Location</th>").addClass("cursor-pointer")
      .click(()=> {
      moveSortArrow('Location');
      sortHandler('Location');
    })
  );
  
  const moveSortArrow = newSortColumn => {
    tableHeader.children().each(function() {
      const columnHeader = $(this);
      const innerText = columnHeader.text();
      console.log(innerText);
      if (columnHeader.text() === newSortColumn) {
        columnHeader.append($("<span>&#8595;</span>"));
      } else {
        columnHeader.children().each(function() {$(this).remove()});
      }
    })
  };
  
  return $("<thead></thead>").addClass('thead-light').append(getSearchRow(handleSearchStringInput)).append(tableHeader);
}