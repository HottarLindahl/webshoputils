debug=true;

const fs = require('fs');
const csv = require('@fast-csv/parse');
const Product = require('./product');



class Controller{

    rows

    constructor() {
        
    }

    PrepareProducts= (importrows) =>{
        let products = [];
        let mainprod = false;

        for(let n in importrows){
            if(!mainprod && importrows[n].artikelnummer != ''){
                if(typeof product !== 'undefined')products.push(product)//add products from last loop

                mainprod = true;
                const product = new Product.Product();
                //TODO ADD FIELD MAPPER
                product.SetProductFromObj(importrows[n])
            }else{
                mainprod = false;
                product.AddChild(importrows[n])
            }
        }
        if(product)products.push(product)//last loop



        return products


    }

}//END CLASS



module.exports.Controller = Controller