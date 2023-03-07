const model = {}

module.exports = model

model.getOrder = async(trx)=>{
    // let rows = await trx('order').then(rows=>rows)
    let rows = await trx.raw(`

        SELECT o.id
        ,o.cus_name
        ,o.cus_address
        ,o.ship_date
        ,o.ship_time
        ,v.name
        ,sum(od.qty*p.price) as total_price
        ,sum(od.qty*p.weight) as total_weight
        ,sum(od.qty*p.weight*v.price) as total_ship_price
        -- select *
        FROM 'order' o
        INNER JOIN order_detail as od on o.id = od.order_id
        left JOIN vehicle v on o.vehicle_id = v.id
        INNER JOIN product p on p.id = od.product_id
        GROUP BY o.id
    `).then(rows=>rows)
    return rows
}
model.addOrder = async(trx,param)=>{
    let data = await trx('order').insert(param).then(data=>data[0])
    return data
}
model.addOrderDetail = async(trx,detail,order_id)=>{
    let product = {
        order_id : order_id,
        product_id: detail.id,
        product_price : detail.price,
        qty : detail.qty
    }
    let data = await trx('order_detail').insert(product).then(data=>data[0])
    return data
}
model.getbyId = async(trx,id)=>{
    let data = await trx.raw(`
        select o.id
        ,o.cus_name
        ,o.cus_address
        ,o.ship_date
        ,o.ship_time
        ,o.vehicle_id
        ,v.name as vehicle_name
        
        
        from 'order' as o
        LEFT JOIN vehicle v on v.id = o.vehicle_id
        where o.id = ${id}
    `).then(data=>data[0])
    return data
}
model.getDetailById = async(trx,id)=>{
    let rows = await trx.raw(`
        select p.id
        ,p.name
        ,p.price
        ,p.weight
        ,od.qty
        from product p
        INNER JOIN order_detail od on od.product_id = p.id
        where od.order_id = ${id}
    `).then(rows=>rows)
    return rows
}
model.updateOrder = async(trx,order,id)=>{
    let data = await trx('order').update(order).where({id:id}).then(data=>data)
    return data
}
model.delDetail = async(trx,order_id)=>{
    let data = await trx('order_detail').del().where({order_id:order_id}).then(data=>data)
    return data
}