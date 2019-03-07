import * as $ from "jquery";

export default function getSummaryTable (transactionsData, usersData, companiesData, currencyRatesData, choosenCurrency) {
  let summaryTable = $();
  
  const applyCurrency = number => {
    const currencySymbol = choosenCurrency ? choosenCurrency : '$';
    const conwertedNumber = choosenCurrency ? (number / currencyRatesData.USD * currencyRatesData[choosenCurrency]) : number;
    
    return `${currencySymbol} ${conwertedNumber.toFixed(2)}`
  };

  summaryTable = summaryTable.add(
    $("<tr></tr>")
      .append($("<td>Orders Count</td>").attr("colspan", "3"))
      .append($("<td>").text(transactionsData.length).attr("colspan", "4"))
    );

  let summaryChecks = {total:0, mansTotal:0, woMansTotal:0, mansAmount:0, woMansAmount:0};

  transactionsData.forEach(order => {
    summaryChecks.total += (+order.total);
    if (usersData[order.user_id].gender === "Male") {
      summaryChecks.mansTotal += (+order.total);
      summaryChecks.mansAmount++;
    } else {
      summaryChecks.woMansTotal += (+order.total);
      summaryChecks.woMansAmount++;
    }
  });

  summaryTable = summaryTable.add(
    $("<tr></tr>")
      .append($("<td>Orders Total</td>").attr("colspan", "3"))
      .append($("<td>").text(applyCurrency(summaryChecks.total)).attr("colspan", "4"))
  );

  let median = 0;
  if (transactionsData.length) {
    let priseSortedTransactionData = [...transactionsData];
    priseSortedTransactionData.sort((a, b) => {
      return +a.total > +b.total ? 1 : -1;
    });
    if (transactionsData.length % 2) {
      median = +priseSortedTransactionData[Math.floor(transactionsData.length / 2)].total;
    } else {
      median = (+priseSortedTransactionData[transactionsData.length / 2].total + (+priseSortedTransactionData[transactionsData.length / 2 - 1].total)) / 2;
    }
  }
  
  summaryTable = summaryTable.add(
    $("<tr></tr>")
      .append($("<td>Median Value</td>").attr("colspan", "3"))
      .append($("<td>").text(applyCurrency(median)).attr("colspan", "4"))
  );

  summaryTable = summaryTable.add(
    $("<tr></tr>")
      .append($("<td>Average Check</td>").attr("colspan", "3"))
      .append($("<td>").text(applyCurrency(summaryChecks.total / transactionsData.length)).attr("colspan", "4"))
  );

  summaryTable = summaryTable.add(
    $("<tr></tr>")
      .append($("<td>Average Check (Female)</td>").attr("colspan", "3"))
      .append($("<td>").text(applyCurrency(summaryChecks.woMansTotal / summaryChecks.woMansAmount)).attr("colspan", "4"))
  );

  summaryTable = summaryTable.add(
    $("<tr></tr>")
      .append($("<td>Average Check (Male)</td>").attr("colspan", "3"))
      .append($("<td>").text(applyCurrency(summaryChecks.mansTotal / summaryChecks.mansAmount)).attr("colspan", "4"))
  );

  return summaryTable;
};