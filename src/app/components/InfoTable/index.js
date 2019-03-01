import getHeader from "./header";
import getBody from "./body"

export default function getInfoTable (transactionData, userData, filterHandler) {
  let infoTable = getHeader().add(getBody());
 return infoTable;
};