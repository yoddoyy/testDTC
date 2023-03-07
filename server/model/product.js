const model = {}

module.exports = model

model.getProduct = async(trx)=>{
    let rows = trx('product').then(rows=>rows)
    // let rows = await trx.raw(`select p.id,p.name,p.desc,c.name as category
    // from product p inner join category c on p.category_id = c.id`).then(rows=>rows)
    return rows
}

model.addProduct = async (trx,item)=>{
    let data = await trx('product').insert(item).then(data=>data) 
    return data
}

model.searchProduct = async (trx,query)=>{    
    let rows = await trx.raw(query).then(rows=>rows)
    return rows
}

model.delProduct = async (trx,id)=>{
    let data = await trx('product').delete().where({id:id}).then(data=>data)
    return data
}

model.updateProduct =async (trx,param)=>{
    let id = param.id
    delete param.id
    param.update_at =  new Date().toISOString()
    await trx('product').update(param).where({id:id})
    return 0
}