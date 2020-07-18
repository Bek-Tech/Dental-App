import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('sales.db');

export const initSales = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS sales (id INTEGER PRIMARY KEY NOT NULL, day REAL NOT NULL,month REAL NOT NULL,year REAL NOT NULL, customerId REAL NOT NULL, customerName TEXT NOT NULL, productsArr TEXT NOT NULL , status TEXT NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const sortSales = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT id, day,month,year FROM sales
                 ORDER BY  id DESC`,
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};



export const insertSale = (day, month, year, customerId, customerName, productsArr) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO sales (day,month,year , customerId, customerName, productsArr ,status) VALUES (?, ?, ?, ?, ?, ?,?);`,
                [day, month, year, customerId, customerName, productsArr, "active"],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchSales = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT id,day, month, year, customerId, customerName, productsArr FROM sales GROUP BY id   HAVING status LIKE "active" ORDER BY id DESC',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchDeletedSales = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT  id,day, month, year, customerId, customerName, productsArr, status FROM sales GROUP BY id  HAVING status LIKE "inactive" ORDER BY id DESC `,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};


export const deleteSale = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE sales SET  status = "inactive" WHERE id =${id}`,
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};



export const totallyDeleteSale = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE sales SET day=0 , month =0, year = 0 , customerId = 0 ,  customerName= "deleted" , productsArr='[]' , status = "deleted" WHERE id =${id}`,
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};



export const updateSale = (id, day, month, year, customerId, customerName, productsArr) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE sales SET  day= ${day}, month=${month}, year= ${year}, customerId= ${customerId} , customerName= "${customerName}",  productsArr='${productsArr}' WHERE id =${id}`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const updateSaleStatus = (id, status) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE sales SET status = "${status}" WHERE id =${id}`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};