import * as $ from "jquery";
/**
 * we already have jquery in bootstrap dependencies. So I think its good idea to use it everywhere else
 */

import { getInfoTable, getTableHeader} from './components/InfoTable'
import getSummaryTable from './components/summaryTable'
import getCurrencyChooseSection from './components/currencyChooseSection'

import localTransactionsData from '../../data/orders.json'
import localUsersData from '../../data/users.json'
import localCompaniesData from '../../data/companies.json'

const SEARCHABLE_ORDER_FIELDS = ["transaction_id", "total", "order_country", "order_ip", "card_type"];

const SEARCHABLE_USER_FIELDS = ["first_name", "last_name"];

function app () {
  let ordersData = localTransactionsData;
  let filteredOrdersData = [...ordersData];
  let searchString = '';
  let sortColumn = '';
  let tableHolder = null;
  const mainTableWrapper = $("<table></table>").addClass("table table-striped");
  let infoTable = null;
  let summaryTable = null;
  let currencyRatesData = {};
  let choosenCurrency = '';
  
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
    infoTable = getInfoTable(filteredOrdersData, usersData, companiesData, currencyRatesData, choosenCurrency);
    summaryTable = getSummaryTable(filteredOrdersData, usersData, companiesData, currencyRatesData, choosenCurrency);
    mainTableWrapper.append(getTableHeader(sortTable, sortColumn, handleSearchStringInput));
    mainTableWrapper.append(infoTable.append(summaryTable));
    tableHolder.append(mainTableWrapper);
  };
  
  const refreshTable = () => {
    infoTable.remove();
    summaryTable.remove();
    
    if (searchString) {
      filteredOrdersData = ordersData.filter(filterTable)
    } else {
      filteredOrdersData = [...ordersData]
    }
    
    infoTable = getInfoTable(filteredOrdersData, usersData, companiesData, currencyRatesData, choosenCurrency);
    summaryTable = getSummaryTable(filteredOrdersData, usersData, companiesData, currencyRatesData, choosenCurrency);
    mainTableWrapper.append(infoTable);
    mainTableWrapper.append(summaryTable);
  };
  
  const loadTableData = () => {
    $.when(
      $.getJSON('http://localhost:9000/api/orders'),
      $.getJSON('http://localhost:9000/api/users'),
      $.getJSON('http://localhost:9000/api/companies'),)
      .then(
        (onlineOrdersData, onlineUsersData, onlineCompaniesData) => {
          ordersData = onlineOrders;
          filteredOrdersData = [...ordersData];
          sortColumn = '';
          searchString = '';
          
          usersData = listToObj(onlineUsersData);
          companiesData = listToObj(onlineCompaniesData);
  
          refreshTable();
        },
        () => {
          console.log('Failed to get one of data files, staying on local data.')
        }
      );
  };
  
  const loadCurrencyData = () => {
    $.getJSON('https://api.exchangeratesapi.io/latest', {}, (data) => {
      currencyRatesData = data.rates;
      mainTableWrapper.append(getCurrencyChooseSection(currencyRatesData, choosenCurrency, handleCurrencySelect))
    })
  };

  const sortTable = field => {
    if (field !== sortColumn) {
      sortColumn = field;
      
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
      refreshTable();
    }
  };
  
  const handleSearchStringInput = () => {
    searchString = $("#search").val();
    refreshTable();
  };
  
  const handleCurrencySelect = currencyAbbreviation => {
    if (currencyAbbreviation !== choosenCurrency) {
      if (currencyAbbreviation === "USD") {
        choosenCurrency = '';
      } else {
        choosenCurrency = currencyAbbreviation;
      }
      refreshTable();
    }
  };
  
  const filterTable = order => {
    let filterPassed = false;
    SEARCHABLE_ORDER_FIELDS.forEach(fieldName => {
      if (order[fieldName].toLowerCase().includes(searchString.toLowerCase())) filterPassed = true;
    });
  
    SEARCHABLE_USER_FIELDS.forEach(fieldName => {
      if (usersData[order.user_id][fieldName].toLowerCase().includes(searchString.toLowerCase())) filterPassed = true;
    });
    return filterPassed;
  };
  
  $(document).ready(()=>{
    tableHolder = $("#app");
    createTable();
    loadCurrencyData();
    loadTableData();
  });
}

export default app;