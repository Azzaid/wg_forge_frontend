import jQuery from "jquery";
/**
 * we already have jquery in bootstrap dependencies. So I think its good idea to use it everywhere else
 */

import getInfoTable from './components/InfoTable/index.js'

function app () {
  const $ = jQuery;
  
  const handleFilterColumnChose = () => {};
  const handleSearchStringInput = () => {};
  const refillTable = () => {};
  const createTable = () => {
    const mainTableObj = $("<table></table>").addClass("table");
    const infoTable = getInfoTable();
  };
  
  $(document).ready(()=>{
    const appPlaceholder = $("#app");
    appPlaceholder.append($('<button></button>').text('IBHTN_PENECK!!').addClass('btn btn-primary'));
  });
}

export default app;