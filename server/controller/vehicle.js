const vehicleModel = require('../model/vehicle')
const ctrl = {}

module.exports = ctrl

ctrl.getVehicle = async (req,res)=>{
    try{
        let vehicle = await vehicleModel.getVehicle(req.db)

        res.send({
            data:vehicle,
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

ctrl.getDropdownVehicle = async (req,res)=>{
    try{
        let dropdown = await vehicleModel.getDropdown(req.db)

        res.send({
            data:dropdown,
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