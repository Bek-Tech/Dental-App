import { insertSale } from '../DataBase/salesDB'


export const ADD_SALES = 'ADD_SALES'
export const ADD_NEW_SALE = 'ADD_NEW_SALE'


export const addSales = data => {
    if (data.length > 0) {
        const result = data.map(item => {
            const parsedProducts = JSON.parse(item.productsArr)
            return { ...item, productsArr: parsedProducts }
        })
        return { type: ADD_SALES, payload: result }
    }
    return { type: ADD_SALES, payload: data }

}

export const addNewSale = (day, month, year, customerId, customerName, productsArr) => {
    const stringArr = JSON.stringify(productsArr)
    insertSale(day, month, year, customerId, customerName, stringArr)
    console.log(" inserted")
    const saleObj = { day, month, year, customerId, customerName, productsArr }
    return { type: ADD_NEW_SALE, payload: saleObj }
}