const mongoose = require('mongoose');

async function main(){
    await mongoose.connect(process.env.MONGODB_URI)
}

main()
.then(()=>console.log('Conectado ao mongo'))
.catch((err)=>console.log('Deu erro', err))

module.exports = mongoose;