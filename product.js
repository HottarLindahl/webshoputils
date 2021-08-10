debug=true;

const Ccvapi = require('./ccvapi');

const fs = require('fs');

const api = new Ccvapi.Api('', "", "");
const FILEPATH = './JSON_responses/'



class Product{

    id
    productobj
    children = []; 

    constructor(productid) {

        this.filepath = FILEPATH;

        this.testobj= {
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
            "eannumber": "",
            "page_title": "Mayura Cowboy Boots 1935 bruin met camel pythonleer",
            "alias":"Mayura-Boots-1935-C-MEX-Bruin-met-Camel-Python-Heren-Spitse-Cowboy-Laarzen",
            "meta_description": "Zoek je cowboy en western laarzen?  Echt spitse cowboy laarzen met python op de wreef vindt je in onze webshop."
          }

          this.testobj2= {
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
            "sku_number": "MB1935-ZCAMEL-40",
            "size": "40",
            "eannumber": "8435503722739",
            "page_title": "Mayura Cowboy Boots 1935 bruin met camel pythonleer",
            "alias":"Mayura-Boots-1935-C-MEX-Bruin-met-Camel-Python-Heren-Spitse-Cowboy-Laarzen",
            "meta_description": "Zoek je cowboy en western laarzen?  Echt spitse cowboy laarzen met python op de wreef vindt je in onze webshop."
          }

          this.testobj3= {
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
            "sku_number": "MB1935-ZCAMEL-41",
            "size": "41",
            "eannumber": "8435503722739",
            "page_title": "Mayura Cowboy Boots 1935 bruin met camel pythonleer",
            "alias":"Mayura-Boots-1935-C-MEX-Bruin-met-Camel-Python-Heren-Spitse-Cowboy-Laarzen",
            "meta_description": "Zoek je cowboy en western laarzen?  Echt spitse cowboy laarzen met python op de wreef vindt je in onze webshop."
          }



          this.AddChild({
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
            "sku_number": "MB1935-ZCAMEL-40",
            "size": "40",
            "eannumber": "8435503722739",
            "page_title": "Mayura Cowboy Boots 1935 bruin met camel pythonleer",
            "alias":"Mayura-Boots-1935-C-MEX-Bruin-met-Camel-Python-Heren-Spitse-Cowboy-Laarzen",
            "meta_description": "Zoek je cowboy en western laarzen?  Echt spitse cowboy laarzen met python op de wreef vindt je in onze webshop."
          }
)

          this.AddChild({
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
            "sku_number": "MB1935-ZCAMEL-41",
            "size": "41",
            "eannumber": "8435503722739",
            "page_title": "Mayura Cowboy Boots 1935 bruin met camel pythonleer",
            "alias":"Mayura-Boots-1935-C-MEX-Bruin-met-Camel-Python-Heren-Spitse-Cowboy-Laarzen",
            "meta_description": "Zoek je cowboy en western laarzen?  Echt spitse cowboy laarzen met python op de wreef vindt je in onze webshop."
          })

          this.productid = productid;
        
    }

    SetProductId = (id) =>{
        this.id=id;
    }

    SetProductFromFile = (file) =>{
        this.productobj = JSON.parse(fs.readFileSync(this.filepath + file))
        this.SetProductId(this.productobj.id)
    }

    SetProductFromObj = (obj) =>{
      this.productobj = obj
  }

    SetProductFromShop = async (id) =>{
        await api.GetProductById(id)
        this.productobj = JSON.parse(fs.readFileSync(this.filepath + 'products'+id+'.json'))
        this.SetProductId(this.productobj.id)
    }

    AddChild  = (child) =>{
    if(this.children == undefined){
        this.children = child
    }else{
        const childarray = this.children
        childarray.push(child);
        
            this.children = childarray;
        }
    }
    




    
}//END CLASS



module.exports.Product = Product;