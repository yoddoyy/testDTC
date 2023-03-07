const orderModel = require('../model/order')
const vehicleModel = require('../model/vehicle')
const ctrl = {}

module.exports = ctrl

ctrl.getOrder = async (req,res)=>{
    try{
        let order = await orderModel.getOrder(req.db)

        res.send({
            data:order,
            status :true
        })
    }catch(e){
        console.log(e)
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}

ctrl.addOrder = async(req,res)=>{
    console.log('9999999999',req.body)
    try {
		await req.db.transaction(async trx => {
            try{
                let order = {
                    cus_name: req.body.cus_name,
                    cus_address: req.body.cus_address,
                    ship_date: req.body.ship_date,
                    ship_time: req.body.ship_time,
                    vehicle_id: req.body.vehicle_id,
                }
                if(order.vehicle_id!=0){
                    order.vehicle_price = await vehicleModel.getVehiclePrice(trx,order.vehicle_id)
                }
                let order_id = await orderModel.addOrder(trx,order)
                let orderDetail = req.body.products
                for (let i = 0; i < orderDetail.length; i++) {
                    const detail = orderDetail[i];
                    await orderModel.addOrderDetail(trx,detail,order_id)
                    
                }
                console.log(req.body)
                res.send({
                    data:order_id,
                    status :201,
                    message: 'success',
                })
            }catch(e){
                await trx.rollback(e)
            }
        })
    }catch(e){
        console.log(e)
        res.send({
            message: ('e :',e),
            status :400
        })
    }
}

ctrl.getOrderbyId = async(req,res)=>{

    try{
        let data = await orderModel.getbyId(req.db,req.query.id)
        data.orders = await orderModel.getDetailById(req.db,req.query.id)

        res.send({
            data: data,
            status :200,
            message : 'success'
        })
    }catch(e){
        console.log(e)
        res.send({
            message: ('e :',e),
            status :400
        })
    }
}

ctrl.updateOrder = async (req,res)=>{
    try {
		await req.db.transaction(async trx => {
            console.log('req.body',req.body)
            try{
                const order_id = req.body.order_id
                let order = {
                    cus_name: req.body.cus_name,
                    cus_address: req.body.cus_address,
                    ship_date: req.body.ship_date,
                    ship_time: req.body.ship_time,
                    vehicle_id: req.body.vehicle_id,
                }
                if(order.vehicle_id!=0){
                    order.vehicle_price = await vehicleModel.getVehiclePrice(trx,order.vehicle_id)
                }
                await orderModel.updateOrder(trx,order,order_id)
                await orderModel.delDetail(trx,order_id)

                let orderDetail = req.body.products
                for (let i = 0; i < orderDetail.length; i++) {
                    const detail = orderDetail[i];
                    await orderModel.addOrderDetail(trx,detail,order_id)
                    
                }

                res.send({
                    data:req.body.order_id,
                    status :201,
                    message: 'success',
                })
            }catch(e){
                await trx.rollback(e)
            }
        })
    }catch(e){
        console.log(e)
        res.send({
            message: ('e :',e),
            status :400
        })
    }
}