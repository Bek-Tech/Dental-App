import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('sales.db');

export const initSales = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS sales (id INTEGER PRIMARY KEY NOT NULL, day REAL NOT NULL,month REAL NOT NULL,year REAL NOT NULL, customerId REAL NOT NULL, customerName TEXT NOT NULL, productsArr TEXT NOT NULL);',
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
                `INSERT INTO sales (day,month,year , customerId, customerName, productsArr ) VALUES (?, ?, ?, ?, ?, ?);`,
                [day, month, year, customerId, customerName, productsArr],
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
                'SELECT id,day, month, year, customerId, customerName, productsArr FROM sales ORDER BY id DESC',
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

export const deleteSale = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM sales WHERE id= ${id}`,
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


// export const updateSale = (id, day, month, year, customerId, customerName, productsArr) => {
//     const promise = new Promise((resolve, reject) => {
//         // update  query   did not  work so  use deletion and insert instead
//         deleteSale(id).then(() => {
//             db.transaction(tx => {
//                 tx.executeSql(
//                     `INSERT INTO sales (id,day, month, year, customerId, customerName, productsArr) VALUES (?,?, ?, ?,?, ?, ?)`,
//                     [id, day, month, year, customerId, customerName, productsArr],
//                     (_, result) => {
//                         resolve(result);
//                     },
//                     (_, err) => {
//                         reject(err);
//                     }
//                 );
//             });

//         })

//     });
//     return promise;
// };


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