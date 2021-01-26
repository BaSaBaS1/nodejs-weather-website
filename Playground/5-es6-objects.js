const name = 'Bas'
const userAge = 25

const user = {
    name,
    age: userAge,
    location: 'Philadelphia'
}

console.log(user)

const product = {
    label: 'red notebook',
    price: 3,
    stock: 201,
    salePrice:undefined,
    rating: 350
}

// const label = product.label
// const stock = product.stock

const {label, stock, rating = 5} = product
console.log(label)
console.log(stock)
console.log(rating)

const transaction = (type, { label, stock})=>{
    console.log(type, label, stock)
}

transaction('order', product)
