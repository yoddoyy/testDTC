const model = {}

module.exports = model

model.getVehicle = async(trx)=>{
    let rows = trx('vehicle').then(rows=>rows)
    return rows
}

model.getDropdown = async(trx)=>{
    let rows = trx('vehicle').select('id','name').then(rows=>rows)
    return rows
}

model.getVehiclePrice = async(trx,id)=>{
    let data = await trx('vehicle').select('price').where({id:id}).then(data=>data[0].price)
    return data
}