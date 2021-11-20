let db;
let budgetVersion;

// Create a new db request for a "budget" database
const request = indexDB.open('BudgetDB', budgetVersion || 21);

