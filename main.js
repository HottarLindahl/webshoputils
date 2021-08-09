debug=true;
RUNTESTS = true;
const Tests = require('./tests');
const Product = require('./product');
const Ccvapi = require('./ccvapi');
const Import = require('./import');
const PhotoUtils = require('./photoutils');
const picsFolder = './pics/';
const fs = require('fs');

const photoutils = new PhotoUtils.PhotoUtils();
const api = new Ccvapi.Api('/api/rest/v1/products', "GET", "");
const tests = new Tests.Tests();
const product = new Product.Product();

if(debug)console.log('Start')

obj2={"product_id": 785355432, "category_id": 28511624}





async function main() {
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
    //if(RUNTESTS)await tests.Basics();
    //await api.DeleteProduct('781127754')
    //await api.GetAttributeValueMapping(171911)
    //if(debug)console.log(api.GetAttributeValueId(product.testobj2.size));
    
    
    
    if(debug)console.log('Done --- Exit 0');
  }


main();