import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('customers.db');
export const initCustomers = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY NOT NULL, date TEXT NOT NULL, name TEXT NOT NULL, phone REAL);',
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

export const insertCustomer = (date, name, phone) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO customers (date,  name, phone) VALUES (?, ?, ?);`,
                [date, name, phone],
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

export const fetchCustomers = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT id,date, name, phone FROM customers ORDER BY id DESC',
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

export const deleteCustomer = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM customers WHERE id= ${id}`,
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


export const updateCustomer = (id, date, name, phone) => {
    const promise = new Promise((resolve, reject) => {
        // update  query   did not  work so  use deletion and insert instead
        deleteCustomer(id).then(() => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO customers (id,date, name, phone) VALUES ( ?,?, ?, ?)`,
                    [id, date, name, phone],
                    (_, result) => {
                        resolve(result);
                    },
                    (_, err) => {
                        reject(err);
                    }
                );
            });

        })

    });
    return promise;
};