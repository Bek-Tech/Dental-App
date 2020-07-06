import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('customers.db');
export const initCustomers = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY NOT NULL, date TEXT NOT NULL, name TEXT NOT NULL, phone REAL, status TEXT NOT NULL);',
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
                `INSERT INTO customers (date,  name, phone , status ) VALUES (?, ?, ?, ?);`,
                [date, name, phone, "active"],
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
                'SELECT id,date, name, phone FROM customers GROUP BY id   HAVING status LIKE "active"  ORDER BY id DESC',
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


export const totallyDeleteCustomer = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE customers SET  name= "deleted${id}",  date= "deleted" ,phone=0 , status = "deleted" WHERE id =${id}`,
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


export const deleteCustomer = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE customers SET  status = "inactive" WHERE id =${id}`,
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
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE customers SET  name= "${name}",  date= "${date}" , phone=${phone} WHERE id =${id}`,
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
