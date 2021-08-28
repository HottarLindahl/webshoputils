debug=true;

const fs = require('fs');
const Product = require('./product');
const Ccvapi = require('./ccvapi');

const api = new Ccvapi.Api('/api/rest/v1/products', "GET", "");



class Controller{

    rows
    currentproduct
    mapping
    filepath = './'

    constructor() {
        this.mapping = JSON.parse(fs.readFileSync(this.filepath + 'mapping.json'))
    }

    StrLeft = (string, separator)=>{
        return string.substr(0, string.indexOf(separator));
    }
    StrRight = (string, separator)=>{
        return string.substr(string.indexOf(separator)+1,string.length );
    }

    PrepareProductsTranslated= (importrows) =>{
        let products = [];
        let mainprod = false;
        let firstloop = true;

        for(let n in importrows){

            if(!mainprod && !firstloop && importrows[n].artikelnummer != ''){

                products.push(this.currentproduct)//add products from last loop
            }


            if(!mainprod && importrows[n].artikelnummer != ''){
                mainprod = true;
                this.currentproduct = new Product.Product();
                //TODO ADD FIELD MAPPER
                let translated = this.TranslateFieldsCCV(importrows[n])
                this.currentproduct.SetProductFromObj(translated)
            }else{
                mainprod = false;
                let translated = this.TranslateFieldsCCV(importrows[n])
                this.currentproduct.AddChild(translated)
            }

            firstloop = false;
        }
        if(this.currentproduct)products.push(this.currentproduct)//last loop



        return products


    }

    PrepareProductsImport= (importrows) =>{
        let products = [];
        let mainprod = false;
        let firstloop = true;

        for(let n in importrows){

            if(!mainprod && !firstloop && importrows[n].artikelnummer != ''){

                products.push(this.currentproduct)//add products from last loop
            }


            if(!mainprod && importrows[n].artikelnummer != ''){
                mainprod = true;
                this.currentproduct = new Product.Product();                
                this.currentproduct.SetProductFromObj(importrows[n])
            }else{
                mainprod = false;
                this.currentproduct.AddChild(importrows[n])
            }

            firstloop = false;
        }
        if(this.currentproduct)products.push(this.currentproduct)//last loop



        return products


    }



    TranslateFieldsCCV = (obj) =>{
        let returnobj = {};

        for (let n in this.mapping.ccv) {
            const map = this.mapping.ccv[n];
            const ccvattribname = this.StrRight(map,'#');
            const csvattribname = this.StrLeft(map,'#')

            if(obj[csvattribname] !== undefined){
                if(ccvattribname === 'price' || ccvattribname === 'product_layout' || ccvattribname === 'size'|| ccvattribname === 'stock'){
                    returnobj[ccvattribname] = parseInt(obj[csvattribname])
                }
                else returnobj[ccvattribname] = obj[csvattribname];
            }

            
        }
        returnobj.active = false;
        returnobj.package_id= 80831;
        returnobj.brand_id=24510928;
        returnobj.discount=0;
        returnobj.taxtariff="normal";
        returnobj.condition_id=910622; //Nieuw
        returnobj.stockenabled=true;
        

        return returnobj;

    }

    SearchProduct = async (searchString) =>{
        return new Promise(async (resolve,reject)=>{
            await api.GetProductById(searchString);
            const obj = api.productobj
            resolve(obj)
        })

    }

   

}//END CLASS



module.exports.Controller = Controller