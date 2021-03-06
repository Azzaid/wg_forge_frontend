import getHeader from "./header";
import getBody from "./body"

export function getTableHeader (sortHandler, sortedBy, handleSearchStringInput) {
  return getHeader(sortHandler, sortedBy, handleSearchStringInput);
};

export function getInfoTable (transactionsData, usersData, companiesData, currencyRatesData, choosenCurrency) {
 return getBody(transactionsData, usersData, companiesData, currencyRatesData, choosenCurrency);
};