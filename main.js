debug=true;
RUNTESTS = false;
const Tests = require('./tests');
const Product = require('./product');
const Ccvapi = require('./ccvapi');
const Import = require('./import');
const Controller = require('./controller');
const PhotoUtils = require('./photoutils');
const picsFolder = './pics/';
const fs = require('fs');

const photoutils = new PhotoUtils.PhotoUtils();
const api = new Ccvapi.Api('/api/rest/v1/products', "GET", "");
const tests = new Tests.Tests();
const product = new Product.Product();
const importer = new Import.Import();
const controller = new Controller.Controller();
if(debug)console.log('Start')

obj2={"product_id": 785383789, "category_id": 28511624}





main = async ()=> {
    
    try {

      // await api.GetAllProducts()
    // await api.GetProductById('781172393')
    // await api.GetProductPhotos('781172393')
    // // await api.GetProductPhotosLinks('37878413')
    // //await api.GetProductVariationsById('37878413')
    // //await api.CreateProduct(product.testobj)
    //await api.SetProductCategory(obj2);
    // // await CreatePicsList();
    // // await picslist.forEach(async pic => {

    // //   await api.CreatePhoto('781172393', pic)
    // await photoutils.CreatePicsList(picsFolder);
    
    // let picslist =  photoutils.GetPicsList();
    // if(debug)console.log(JSON.stringify(picslist));
    // //await photoutils.UploadList(picslist);
    
    //await api.DeleteProduct('781127754')
    //await api.GetAttributeValueMapping(171911)
    //if(debug)console.log(api.GetAttributeValueId(product.testobj2.size));
    //await product.SetProductFromShop(785383789)
    //await product.SetProductFromFile('products785383789.json')
    //await UpdateProductAttributes(product)
    //await UpdateComboValues(product)
    
    //let test = await importer.Importcsv('importfiler/fewprods.csv','')
    //console.log(test)
    //console.log(importer.rows)
    //controller.PrepareProducts(importer.rows)
    if(RUNTESTS)await tests.Basics();
    console.log('dsd')

  }
  catch (e) {
    console.log("entering catch block");
    console.log(e);
    console.log(e.response.data);
    console.log("leaving catch block");
  }
    
    
    if(debug)console.log('Done --- Exit 0');

  }



  UpdateComboValues = async (product) =>{

    await api.GetAttributeCombinations(product.id)
    product.attributecombinations = api.attributecombinations;
    
    for(let n in product.children){
      let comboid = api.GetAttributeCombinationIdByValueName(product.children[n].size);
      let comboval = {sku_number:product.children[n].sku_number};
      await api.SetAttributeCombinationValues(comboid,comboval)
    }

  }

  UpdateProductAttributes = async (product) =>{

    
    for(let n in product.children){
      let attr_id = api.GetAttributeValueId(product.children[n].size);
      await api.SetProductAttributeValue(product.id,attr_id)
    }

  }


main();