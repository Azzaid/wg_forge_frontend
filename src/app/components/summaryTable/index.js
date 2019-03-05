import * as $ from "jquery";

export default function getSummaryTable (transactionsData, usersData, companiesData) {
  let summaryTable = $();

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
      .append($("<td>").text(`$ ${summaryChecks.total.toFixed(2)}`).attr("colspan", "4"))
  );

  let median = 0;
  let priseSortedTransactionData = [...transactionsData];
  priseSortedTransactionData.sort((a, b) => {
    return +a.total > +b.total ? 1 : -1;
  });
  if (transactionsData.length % 2) {
    median = +priseSortedTransactionData[Math.floor(transactionsData.length / 2)].total;
  } else {
    median = (+priseSortedTransactionData[transactionsData.length / 2].total + (+priseSortedTransactionData[transactionsData.length / 2 - 1].total)) / 2;
  }

  summaryTable = summaryTable.add(
    $("<tr></tr>")
      .append($("<td>Median Value</td>").attr("colspan", "3"))
      .append($("<td>").text(`$ ${median.toFixed(2)}`).attr("colspan", "4"))
  );

  summaryTable = summaryTable.add(
    $("<tr></tr>")
      .append($("<td>Average Check</td>").attr("colspan", "3"))
      .append($("<td>").text(`$ ${(summaryChecks.total / transactionsData.length).toFixed(2)}`).attr("colspan", "4"))
  );

  summaryTable = summaryTable.add(
    $("<tr></tr>")
      .append($("<td>Average Check (Female)</td>").attr("colspan", "3"))
      .append($("<td>").text(`$ ${(summaryChecks.woMansTotal / summaryChecks.woMansAmount).toFixed(2)}`).attr("colspan", "4"))
  );

  summaryTable = summaryTable.add(
    $("<tr></tr>")
      .append($("<td>Average Check (Male)</td>").attr("colspan", "3"))
      .append($("<td>").text(`$ ${(summaryChecks.mansTotal / summaryChecks.mansAmount).toFixed(2)}`).attr("colspan", "4"))
  );

  return summaryTable;
};