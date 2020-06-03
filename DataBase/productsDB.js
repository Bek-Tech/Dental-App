import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('products.db');

export const initProducts = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY NOT NULL, date TEXT NOT NULL, name TEXT NOT NULL UNIQUE,  stock REAL NOT NULL, history BLOB );',
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

export const insertProduct = (date, name, stock, history) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO products (date, name, stock, history) VALUES ( ?, ?, ?,?);`,
                [date, name, stock, history],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occured , product names must be unique !")
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchProducts = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT id, date, name, stock,history FROM products ORDER BY id DESC',
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

export const deleteProduct = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM products WHERE id= ${id}`,
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

export const updateProduct = (id, date, name, stock, history) => {
    const promise = new Promise((resolve, reject) => {
        // update  query   did not  work so  use deletion and insert instead
        deleteProduct(id).then(() => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO products (id,date, name, stock, history) VALUES ( ?,?, ?, ?,?)`,
                    [id, date, name, stock, history],
                    (_, result) => {
                        resolve(result);
                    },
                    (_, err) => {
                        alert("error has occurred")
                        reject(err);
                    }
                );
            });

        })

    });
    return promise;
};