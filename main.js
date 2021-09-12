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






main = async ()=> {
    
    try {

      // await api.GetAllProducts()
    // await api.GetProductById('781172393')
    // await api.GetProductPhotos('781172393')
    // // await api.GetProductPhotosLinks('37878413')
    // //await api.GetProductVariationsById('37878413')
    // //await api.CreateProduct(product.testobj)
    
    // // await CreatePicsList();
    // // await picslist.forEach(async pic => {

    // //   await api.CreatePhoto('781172393', pic)
    // await photoutils.CreatePicsList(picsFolder);
    
    // let picslist =  photoutils.GetPicsList();
    // if(debug)console.log(JSON.stringify(picslist));
    // //await photoutils.UploadList(picslist);
    
    //await api.DeleteProduct('781127754')
    //await api.GetAttributeValueMapping(6003696)
    //if(debug)console.log(api.GetAttributeValueId(product.testobj2.size));
    //await product.SetProductFromShop(785383789)
    //await product.SetProductFromFile('products785383789.json')
    //await UpdateProductAttributes(product)
    //await UpdateComboValues(product)
    //const obj={id:791359794, product_property_group_id:38187}
    //await UpdateProductProperties(obj)
    if(RUNTESTS)await tests.Basics();
    await ImportAndCreateFromFile('./importfiler/belts1.csv')
    
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
      let comboval = {sku_number:product.children[n].sku_number,ean_number:product.children[n].eannumber,stock:product.children[n].stock};
      await api.SetAttributeCombinationValues(comboid,comboval)
    }

  }


  UpdateProductAttributes = async (product) =>{

    
    for(let n in product.children){
      let attr_id = api.GetAttributeValueId(product.children[n].size);
      await api.SetProductAttributeValue(product.id,attr_id)
    }

  }

  UpdateExtraLanguage = async (product) =>{

    let translated = controller.TranslateFieldsEnglish(product.importobj.productobj)
    product.SetProductEnObj(translated)
    // make patch call header english
    api.language = "en";
    await api.PatchProductLanguageFields(product.id, product.enobj);
    /* api.language = "en";
    await api.GetProductPropertyGroupProperties(product.product_property_group_id)
    let proplist = new Array();

    for(let n in api.propertygroupproperties){
      for(let y in product.importobj.productobj){
        let a = "" + api.propertygroupproperties[n].name
        let check = y.toLowerCase()
        if( a.toLowerCase() == check){
          proplist.push({id:api.propertygroupproperties[n].id, value:product.importobj.productobj[y]})
        }
      }
    }

    for(let n in proplist){
      await api.PatchProductPropertyValue(product.id,proplist[n].id,proplist[n].value)
    }
     */

  }

  UpdateProductProperties = async (product) =>{
    product.product_property_group_id=38187; //Maat
    //product.product_property_group_id=6003640; //Kies de juiste maat 
    await api.SetProductPropertyGroup(product.id, product.product_property_group_id)
    await api.GetProductPropertyGroupProperties(product.product_property_group_id)
    let proplist = new Array();

    for(let n in api.propertygroupproperties){
      for(let y in product.importobj.productobj){
        let a = "" + api.propertygroupproperties[n].name
        let check = y.toLowerCase()
        if( a.toLowerCase() == check){
          proplist.push({id:api.propertygroupproperties[n].id, value:product.importobj.productobj[y]})
        }
      }
    }

    for(let n in proplist){
      await api.SetProductPropertyValue(product.id,proplist[n].id,proplist[n].value)
    }
  
  }

  ObjToLower = (obj) =>{
    let key, keys = Object.keys(obj);
    let n = keys.length;
    let newobj={}
    while (n--) {
      key = keys[n];
      newobj[key.toLowerCase()] = obj[key];
      }
    }
    
  

  ImportAndCreateFromFile = async (file) =>{

    await importer.ImportFile(file);
    let importproducts = controller.PrepareProductsImport(importer.rows)
    let products = controller.PrepareProductsTranslated(importer.rows,'ccv')
    
   
    for(let n in products){
      //SETUP
      delete products[n].productobj.size //Only valid for children
      delete products[n].productobj.sku_number ////Only valid for children
      delete products[n].productobj.stock ////Only valid for children
      
      products[n].importobj = importproducts[n]
      let categories  = products[n].importobj.productobj.category_id.split(";");
      //CREATE
      api.language = "nl";
      await api.CreateProduct(products[n].productobj)
      products[n].id = api.productid;
      products[n].shopobj = api.productobj;
      products[n].SetProductImportObj(importproducts[n]);

      
      await photoutils.CreatePicsListFromPattern(products[n].importobj.productobj.pictures)
      //await photoutils.CreatePicsListFromFileList(products[n].importobj.productobj.pictures)
      let picslist = photoutils.GetPicsList();
      for(let y in picslist){
        await api.CreatePhoto(products[n].id, picslist[y])
      }
         
    
     

      //SET
      
      for (let x in categories){
        await api.SetProductCategory({"position": parseInt(x),"product_id": products[n].id, "category_id": parseInt(categories[x])});
      }
      
      
      
      await UpdateProductAttributes(products[n])

      //UPDATE

      await UpdateComboValues(products[n])

      await UpdateProductProperties(products[n])

      await UpdateExtraLanguage(products[n])

    }

    



    console.log('controller done')

  }


main();