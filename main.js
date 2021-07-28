const Ccvapi =require('./ccvapi');
const imageToBase64 = require('image-to-base64');
const picsFolder = './pics/';
const fs = require('fs');


const api = new Ccvapi.Api('/api/rest/v1/products/37878375', "GET", "");
let files = [];
let picurl ='';
let picslist = [];
let x = 0;


CreatePicsList = async () =>{

  fs.readdirSync(picsFolder).forEach(async file => {
    //files.push(file);
  
    await imageToBase64(picsFolder + file ) // Path to the image
      .then(
          (response)=> {
            x = x +1;
             if(x == 6){
              picslist.push(
                {
                  "file_type": "jpg",
                  "source":response,
                  "is_mainphoto": true
                }
    
               ); // "cGF0aC90by9maWxlLmpwZw=="
             }else{
              picslist.push(
                {
                  "file_type": "jpg",
                  "source":response,
                  "is_mainphoto": false
                }
    
               ); // "cGF0aC90by9maWxlLmpwZw=="
             }
          }
      )
      .catch(
          (error) => {
              console.log(error); // Logs an error if there was one
          }
      )
  
  });
}







obj = {
  "productnumber": "ZCAMEL-MB1935-ZCAMEL",
  "active": false,
  "name": "Mayura Boots 1935-C in Milanelo Zamora / Camel 3 Phyton- Spitse Cowboy Western Laarzen Schuine Hak Rechte Schacht Treklussen Goodyear Welted",
  "shortdescription": "Spitse cowboy boots met Python wreef",
  "description": "Een echte spitse, Mexicaanse stijl, western laars. Deze Cowboy laarzen zijn gemaakt van topkwaliteit rundleer met, als speciaal detail, echt koningspython leer op de wreef en hiel. Met een dubbele leren zool van Spaans rundleer. Handgemaakt door Mayura Boots schoenmakers met het beroemde Goodyear Welt System, dat de duurzaamheid van de laars en een uitstekend comfort garandeert.",
  "price": 379.50,
  "discount": 0,
  "package_id": 80831,
  "brand_id": 24510928,
  "taxtariff": "normal",
  "eannumber": "8435503722739",
  "page_title": "Mayura Cowboy Boots 1935 bruin met camel pythonleer",
  "alias":"Mayura-Boots-1935-C-MEX-Bruin-met-Camel-Python-Heren-Spitse-Cowboy-Laarzen",
  "meta_description": "Zoek je cowboy en western laarzen?  Echt spitse cowboy laarzen met python op de wreef vindt je in onze webshop."
}




obj2={"product_id": 781127754, "category_id": 28511624}





async function main() {
    //await api.GetAllProducts()
    await api.GetProductById('78117239')
    // await api.GetProductPhotos('37878413')
    // await api.GetProductPhotosLinks('37878413')
    //await api.GetProductVariationsById('37878413')
    //await api.CreateProduct(obj)
    //await api.SetProductCategory(obj2);
    // await CreatePicsList();
    // await picslist.forEach(async pic => {

    //   await api.CreatePhoto('781172393', pic)
    
    // })
    



    //await api.DeleteProduct('781127754')
    console.log('done');
  }


main();