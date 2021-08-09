debug=true;
const Ccvapi =require('./ccvapi');
const PhotoUtils=require('./photoutils');
const Import = require('./import');
const picsFolder = './pics/';
const fs = require('fs');

const photoutils = new PhotoUtils.PhotoUtils();
const api = new Ccvapi.Api('/api/rest/v1/products', "GET", "");
const importer = new Import.Import();

class Tests{

    constructor() {
        
    }

    Basics = async () =>{
        // if(debug)console.log('import.Importcsv');
        // importer.Importcsv('importfiler/test2.csv','')
        // if(debug)console.log('Done! \n');
        if(debug)console.log('api.GetAllProducts');
        await api.GetAllProducts()
        if(debug)console.log('Done! \n');
        // if(debug)console.log('api.GetProductById');
        // await api.GetProductById('781172393')
        // if(debug)console.log('Done! \n');
    }

    CreateAndUpdate = async () =>{
   
    try {
        await api.CreateProduct(product.testobj)
        await api.SetProductAttributeValue(api.productid,api.GetAttributeValueId(product.testobj2.size))
        await api.SetProductAttributeValue(api.productid,api.GetAttributeValueId(product.testobj3.size))
    }
    catch (e) {
      console.log("entering catch block");
      console.log(e.response.data);
      console.log("leaving catch block");
    }
    }

}//END CLASS

module.exports.Tests = Tests