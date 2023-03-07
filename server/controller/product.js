const productModel = require('../model/product')

const ctrl = {}

module.exports = ctrl

ctrl.getProduct = async (req,res)=>{
    try{
        let product = await productModel.getProduct(req.db)

        res.send({
            data:product,
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

ctrl.addProduct = async (req,res)=>{
    try{
        if(req.body.name==''||req.body.desc==''||req.body.category_id==''){
            throw 'Incomplete information'
        }
        let item = req.body
        item.create_at = new Date().toISOString()
        let data = await productModel.addProduct(req.db,item)

        res.send({
            data:('id :',data[0]),
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

ctrl.searchProduct = async (req,res)=>{
    try{
        let order
        let search
        let param = req.body
        if(param.sort===''){
            order = ''
        }else{
            order = `order by ${param.sort}`
        }
        if(param.keywords===''){
            search = `where 1=1`
        }else{
            search = `where p.name like '%${param.keywords}%' 
                        or p.weight like '%${param.keywords}%' 
                        or p.price like '%${param.keywords}%' `
        }
        let query = `select p.id,p.name,p.weight,p.price
                    from product p
                    ${search}
                    ${order} `
        let rows = await productModel.searchProduct(req.db,query)
        res.send({
            data:rows,
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

ctrl.delProduct = async (req,res)=>{
    try{
        let data = await productModel.delProduct(req.db,req.query.id)
        res.send({
            data:('id :',data[0]),
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

ctrl.updateProduct = async (req,res)=>{
    try{
        await productModel.updateProduct(req.db,req.body)
        res.send({
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