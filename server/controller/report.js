const reportModel = require('../model/report')
const ctrl = {}

module.exports = ctrl

ctrl.getreport = async(req,res)=> {
    try{
        
        let filter = req.body
        let filterCusName = filter.cusName == null ? '' : `and a.send_name = '${filter.cusName}'`        
        let filterSendDate = filter.sendDate == null ? '' : `and a.send_date = '${filter.sendDate}'`
        let sql = `
            select a.send_name  
            ,a.send_date
            ,count(a.id) order_count
            ,sum(a.total_weight) total_weight
            ,sum(a.send_cost) send_cost
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
            where 1=1 
            ${filterCusName}
            ${filterSendDate}
            GROUP BY a.send_name,a.send_date
        `
        let data = await reportModel.getreport(req.db,sql)
        let dropdownCusName = []
        let dropdownSendDate = []
        let dropdownCusNameobj = await reportModel.getDropdownCusName(req.db)
        dropdownCusNameobj.forEach(name => {
            dropdownCusName.push(name.cusName)
        });        
        let dropdownSendDateobj = await reportModel.getDropdownSendDate(req.db)
        dropdownSendDateobj.forEach(date => {
            dropdownSendDate.push(date.sendDate)
        })
        res.send({
            data: data,
            dropdownCusName:dropdownCusName,
            dropdownSendDate:dropdownSendDate,
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