import puppeteer from "puppeteer";

export const getShareData = async (stockSymbol) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.screener.in/company/${stockSymbol}/consolidated/`);

    let shareData = {};

    // Scrappoing profitLoss
    let profitLoss = {};
    let head = await page.evaluate(() => {
        const rows = document.querySelectorAll("#profit-loss tr");
        return Array.from(rows, (row) => {
            let columns = row.querySelectorAll("th");
            return Array.from(columns, (column) => column.innerText);
        });
    });

    let tableHeads = [];
    head[0].forEach((row) => {
        if (row.toString().trim() !== "") tableHeads.push(row);
    });

    let body = await page.evaluate(() => {
        const rows = document.querySelectorAll("#profit-loss tr");
        return Array.from(rows, (row) => {
            let columns = row.querySelectorAll("td");
            return Array.from(columns, (column) => column.innerText);
        });
    });

    profitLoss.head = tableHeads;
    profitLoss.sales = body[1]?.slice(1);
    profitLoss.expenses = body[2]?.slice(1);
    profitLoss.operating_profit = body[3]?.slice(1);
    profitLoss.opm = body[4]?.slice(1);
    profitLoss.other_income = body[5]?.slice(1);
    profitLoss.interest = body[6]?.slice(1);
    profitLoss.depreciation = body[7]?.slice(1);
    profitLoss.profit_before_tax = body[8]?.slice(1);
    profitLoss.tax = body[9]?.slice(1);
    profitLoss.net_profit = body[10]?.slice(1);
    profitLoss.eps_in_rs = body[11]?.slice(1);
    profitLoss.dividend_payout = body[11]?.slice(1);

    shareData.profit_loss = profitLoss;

    //   Scrapping balanceSheet
    let balanceSheet = {};

    head = await page.evaluate(() => {
        const rows = document.querySelectorAll("#balance-sheet tr");
        return Array.from(rows, (row) => {
            let columns = row.querySelectorAll("th");
            return Array.from(columns, (column) => column.innerText);
        });
    });

    tableHeads = [];
    head[0].forEach((row) => {
        if (row.toString().trim() !== "") tableHeads.push(row);
    });

    body = await page.evaluate(() => {
        const rows = document.querySelectorAll("#balance-sheet tr");
        return Array.from(rows, (row) => {
            let columns = row.querySelectorAll("td");
            return Array.from(columns, (column) => column.innerText);
        });
    });

    balanceSheet.head = tableHeads;
    balanceSheet.share_capital = body[1]?.slice(1);
    balanceSheet.reserves = body[2]?.slice(1);
    balanceSheet.borrowings = body[3]?.slice(1);
    balanceSheet.other_liabilities = body[4]?.slice(1);
    balanceSheet.total_liabilities = body[5]?.slice(1);
    balanceSheet.fixed_assets = body[6]?.slice(1);
    balanceSheet.cwip = body[7]?.slice(1);
    balanceSheet.investments = body[8]?.slice(1);
    balanceSheet.other_assets = body[9]?.slice(1);
    balanceSheet.total_assets = body[10]?.slice(1);

    shareData.balance_sheet = balanceSheet;

    // Scrapping Cash flow
    let cashFlow = {};

    head = await page.evaluate(() => {
        const rows = document.querySelectorAll("#cash-flow tr");
        return Array.from(rows, (row) => {
            let columns = row.querySelectorAll("th");
            return Array.from(columns, (column) => column.innerText);
        });
    });

    tableHeads = [];
    head[0].forEach((row) => {
        if (row.toString().trim() !== "") tableHeads.push(row);
    });

    body = await page.evaluate(() => {
        const rows = document.querySelectorAll("#cash-flow tr");
        return Array.from(rows, (row) => {
            let columns = row.querySelectorAll("td");
            return Array.from(columns, (column) => column.innerText);
        });
    });

    cashFlow.head = tableHeads;
    cashFlow.cash_from_operating_activity = body[1]?.slice(1);
    cashFlow.cash_from_investing_activity = body[2]?.slice(1);
    cashFlow.cash_from_financing_activity = body[3]?.slice(1);
    cashFlow.net_cash_flow = body[4]?.slice(1);

    shareData.cash_flow = cashFlow;

    // Scrapping share holding
    let shareHolding = {};

    head = await page.evaluate(() => {
        const rows = document.querySelectorAll("#shareholding tr");
        return Array.from(rows, (row) => {
            let columns = row.querySelectorAll("th");
            return Array.from(columns, (column) => column.innerText);
        });
    });

    tableHeads = [];
    head[0].forEach((row) => {
        if (row.toString().trim() !== "") tableHeads.push(row);
    });

    body = await page.evaluate(() => {
        const rows = document.querySelectorAll("#shareholding tr");
        return Array.from(rows, (row) => {
            let columns = row.querySelectorAll("td");
            return Array.from(columns, (column) => column.innerText);
        });
    });

    shareHolding.head = tableHeads;
    shareHolding.promoters = body[1]?.slice(1);
    shareHolding.fiis = body[2]?.slice(1);
    shareHolding.diis = body[3]?.slice(1);
    shareHolding.government = body[4]?.slice(1);
    shareHolding.public = body[5]?.slice(1);

    shareData.shareholding = shareHolding;

    // Scrapping analysis
    let analysis = {}
    let pros = await page.evaluate(()=>{
        const tempPros = document.querySelectorAll('#analysis .pros li');
        return Array.from(tempPros,(pro)=>pro.innerText);
    });
    analysis.pros = pros;

    let cons = await page.evaluate(()=>{
        const tempCons = document.querySelectorAll('#analysis .cons li');
        return Array.from(tempCons,(con)=>con.innerText);
    });
    analysis.cons = cons;

    shareData.analysis = analysis;

    await browser.close();
    return shareData;
};