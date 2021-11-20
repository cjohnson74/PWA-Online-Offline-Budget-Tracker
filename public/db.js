let db;
let budgetVersion;

// Create a new db request for a "budget" database
const request = indexDB.open('BudgetDB', budgetVersion || 21);

request.onupgradeneeded = function (e) {
    console.log('Upgrade needed in IndexDB');

    const { oldVersion } = e;
    const newVersion = e.newVersion || db.version;
}