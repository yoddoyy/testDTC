const model = {}

module.exports = model

model.getreport = async (trx,sql)=>{
    // let rows = await trx.raw(`
    //     select a.send_name  
    //     ,a.send_date
    //     ,count(a.id) order_count
    //     ,sum(a.total_weight) total_weight
    //     ,sum(a.send_cost) send_cost
    //     from(
    //         select v.name send_name
    //         ,o.ship_date send_date
    //         ,o.id
    //         ,sum(od.qty*p.weight) total_weight
    //         ,sum(od.qty*p.weight*v.price) send_cost
    //         from 'order' o
    //         INNER JOIN vehicle v on v.id = o.vehicle_id
    //         INNER JOIN order_detail od on od.order_id = o.id
    //         INNER JOIN product p on p.id = od.product_id
    //         GROUP BY o.id ) as a
    //     GROUP BY a.send_name,a.send_date
    // `).then(rows=>rows)
    let rows = trx.raw(sql).then(rows=>rows)
    return rows
}

model.getDropdownCusName = async (trx)=>{
    let rows = await trx.raw(`
        select DISTINCT(a.send_name) cusName
        from(
            select v.name send_name
            ,o.ship_date send_date
            ,o.id
            ,sum(od.qty*p.weight) total_weight
            ,sum(od.qty*p.weight*v.price) send_cost
            from 'order' o
            INNER JOIN vehicle v on v.id = o.vehicle_id
            INNER JOIN order_detail od on od.order_id = o.id
            INNER JOIN product p on p.id = od.product_id
            GROUP BY o.id ) as a
        GROUP BY a.send_name,a.send_date
    `).then(rows=>rows)
    return rows
}

model.getDropdownSendDate = async (trx)=>{
    let rows = await trx.raw(`
        select DISTINCT(a.send_date) sendDate
        from(
            select v.name send_name
            ,o.ship_date send_date
            ,o.id
            ,sum(od.qty*p.weight) total_weight
            ,sum(od.qty*p.weight*v.price) send_cost
            from 'order' o
            INNER JOIN vehicle v on v.id = o.vehicle_id
            INNER JOIN order_detail od on od.order_id = o.id
            INNER JOIN product p on p.id = od.product_id
            GROUP BY o.id ) as a
        GROUP BY a.send_name,a.send_date
    `).then(rows=>rows)
    return rows
}