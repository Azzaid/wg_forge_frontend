import * as $ from "jquery";
/**
 * we already have jquery in bootstrap dependencies. So I think its good idea to use it everywhere else
 */

import getInfoTable from './components/InfoTable/index.js'

function app () {
  const mainTableWrapper = $("<table></table>").addClass("table");
  
  const handleFilterColumnChose = () => {};
  const handleSearchStringInput = () => {};
  const refillTable = () => {};
  
  const createTable = () => {
    mainTableWrapper.append(getInfoTable());
  };
  
  $(document).ready(()=>{
    const appPlaceholder = $("#app");
    createTable();
    appPlaceholder.append(mainTableWrapper);
  });
}

export default app;