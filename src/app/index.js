import * as $ from "jquery";
/**
 * we already have jquery in bootstrap dependencies. So I think its good idea to use it everywhere else
 */

import getInfoTable from './components/InfoTable'
import getSummaryTable from './components/summaryTable'

import localTransactionsData from '../../data/orders.json'
import localUsersData from '../../data/users.json'
import localCompaniesData from '../../data/companies.json'

const SEARCHABLE_FIELDS = [''];

function app () {
  const mainTableWrapper = $("<table></table>").addClass("table table-striped");
  let ordersData = localTransactionsData;
  let filteredOrdersData = [...ordersData];
  let searchString = '';
  let orderInfoTable = '';
  let sortColumn = '';

  const listToObj = list => {
    let obj = {};
    list.forEach(listEntry => {
      obj[listEntry.id] = listEntry;
    });
    return obj
  };

  let usersData = listToObj(localUsersData);
  let companiesData = listToObj(localCompaniesData);


  
  const createTable = () => {
    orderInfoTable = getInfoTable(filteredOrdersData, usersData, companiesData, sortTable, sortColumn);
    mainTableWrapper.append(orderInfoTable);
  };

  const sortTable = field => {
    if (field !== sortColumn) {
      sortColumn = field;

      console.log('unsorted', ordersData, filteredOrdersData);

      ordersData = ordersData.sort((a, b) => {
        switch (field) {
          case 'Transaction ID':
            return a.transaction_id > b.transaction_id ? 1 : -1;
          case 'User Info':
            return `${usersData[a.user_id].first_name}${usersData[a.user_id].last_name}`.toLowerCase() > `${usersData[b.user_id].first_name}${usersData[b.user_id].last_name}`.toLowerCase() ? 1 : -1;
          case 'Order Date':
            return a.created_at > b.created_at ? 1 : -1;
          case "Order Amount":
            return +a.total > +b.total ? 1 : -1;
          case 'Card Type':
            return a.card_type > b.card_type ? 1 : -1;
          case 'Location':
            if (a.order_country !== b.order_country ) {
              return a.order_country > b.order_country ? 1 : -1;
            } else {
              return +(a.order_ip.replace(".", '')) > +(b.order_ip.replace(".", '')) ? 1 : -1;
            }
        }
      });

//TODO filter results if searchstring is present?
      filteredOrdersData = [...ordersData];
      console.log('sorted', ordersData, filteredOrdersData);
      orderInfoTable.remove();
      createTable();
    }
  };

  const handleSearchStringInput = () => {};

  const filterTable = () => {};

  $(document).ready(()=>{
    const appPlaceholder = $("#app");
    createTable();
    appPlaceholder.append(mainTableWrapper);
  });
}

export default app;