import getHeader from "./header";
import getBody from "./body"

export default function getInfoTable (transactionsData, usersData, companiesData, sortHandler, sortedBy) {
  let infoTable = getHeader(sortHandler, sortedBy).add(getBody(transactionsData, usersData, companiesData));
 return infoTable;
};