let db;
let budgetVersion;

// Create a new db request for a "budget" database
const request = indexDB.open('BudgetDB', budgetVersion || 21);

request.onupgradeneeded = function (e) {
    console.log('Upgrade needed in IndexDB');

    const { oldVersion } = e;
    const newVersion = e.newVersion || db.version;

    console.log(`DB Updated from version ${oldVersion} to ${newVersion}`);

    db = e.target.result;

    if (db.objectStoreNames.length === 0) {
        db.createObjectStore('BudgetStore', { autoIncrement: true });
    }
};

request.onerror = function (e) {
    console.log(`Woops! ${e.target.errorCode}`);
};

function checkDatabase() {
    console.log('check db invoked');

    // Open a transaction on your BudgetStore db
    let transaction = db.transaction(['BudgetStore'], 'readwrite');

    // access your BudgetStore object
    const store = transaction.objectStore('BudgetStore');

    // Get all records from store and set to a variable
    const getAll = store.getAll();

    // If the request was successful
    getAll.onsuccess = function() {
        // If there are items in the store, we need to bulk add them when we are back online
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*', 'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    // If our returned response is not empty
                    if (res.length !== 0) {

                    }
                })
        }
    }
}