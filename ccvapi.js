const axios = require('axios').default;
const CryptoJS = require('crypto-js');
const fs = require('fs');
const apikey = require('./api_key_prod.json')
debug=true;
const filepath = './JSON_responses/' 

getAll = (data)=>{
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if(debug)console.log(key + " = " + data[key]);
      
    }
  }
}

log = (data)=>{
  if(debug)console.log("---")
  
  if(debug)console.log(JSON.stringify(data))
  //getAll(data.data)
  //getAll(data.data.items[0])

}






class Api{

  constructor(sUri="/api/rest/v1/", method="GET", data={}) {
    this.sUri = sUri;
    this.method = method;
    this.data = data;
    if(fs.existsSync('./JSON_responses/attributemap.json'))
    this.attributevaluemap = JSON.parse(fs.readFileSync('./JSON_responses/attributemap.json'));
  }
  
  //Private functions

  _SetupCall = (sUri="/api/rest/v1/", method="GET", data='')=>{
    this.data = JSON.stringify(data);
    if(this.data == '""'){
      this.data = '';
    }
    this.filepath= filepath;
    this.sUri = sUri;
    this.method = method;
    this.sTimeStamp = new Date().toISOString();
    this.sStringToHash = this.sPublicKey + '|'+this.method+'|' + this.sUri + '|'+ this.data +'|' + this.sTimeStamp;
  }

  language = "nl"
  sPublicKey = apikey.public_key;
  sSecretKey = apikey.private_key;
  productid;
  propertygroupproperties;

  DoRequest = async ()=>{
    await this.myClient.get(this.sUri)
  .then(response => 
    this._responseFunction(response.data), (error) => {
      if(debug)console.log(error.response.data);
      for (var n in error)
      {console.log(error[n])}
    });

    }

    DoPostRequest = async ()=>{
      let resp = await this.myClient.post(this.sUri,this.data)
      await this._responseFunction(resp.data)
      if(debug)console.log('donepostreq')
    }

    DoPatchRequest = async ()=>{
      let resp = await this.myClient.patch(this.sUri,this.data)
      await this._responseFunction(resp.data)
      if(debug)console.log('donepatchreq')
    }


      DoDeleteRequest = async ()=>{
        await this.myClient.delete(this.sUri)
      .then(response => 
        this._responseFunction(response.data), (error) => {
          if(debug)console.log(JSON.stringify(error.response.data));
          for (var n in error)
        {console.log(error[n])}
        });
        }

  GetHash = ()=>{
    return CryptoJS.HmacSHA512(this.sStringToHash, this.sSecretKey)
  }

  SetupCall = (sUri, method, data)=>{
    this._SetupCall(sUri, method, data)
    this.myClient = axios.create({
      baseURL: "https://www.mooileer.nl",
      headers: {
        'x-date': this.sTimeStamp,
        'x-hash': this.GetHash(),
        'x-public': this.sPublicKey,
        'Accept-Language': this.language
      }
    })
  }


  GetAllProducts= async () =>{
    this._responseFunction=async (data)=>{
      fs.writeFileSync(this.filepath + 'products.json', JSON.stringify(data));
    };
    this.SetupCall('/api/rest/v1/products/','GET')
    await this.DoRequest();
    

  }

    
  GetProductById= async (id) =>{
    this.currentId = id;
    this._responseFunction=async (data)=>{
      //fs.writeFileSync(this.filepath + 'products'+this.currentId+'.json', JSON.stringify(data));
      this.productobj=data;
    };
    this.SetupCall('/api/rest/v1/products/'+this.currentId,'GET')
    await this.DoRequest();
  }

  GetProductPhotos = async (id) =>{
    this.currentId = id;
    this._responseFunction=(data)=>{
      fs.writeFileSync(this.filepath + 'products'+this.currentId+'photos.json', JSON.stringify(data));
    };
    this.SetupCall('/api/rest/v1/products/'+this.currentId + '/productphotos','GET')
    await this.DoRequest();
    
  }

  GetProductPhotosLinks = async (id) =>{
    this.currentId = id;
    this._responseFunction=(data)=>{
    let text='';
      for (let n in data.items){
        text = text + data.items[n].deeplink + '\n'
      }

      fs.writeFileSync(this.filepath + 'products'+this.currentId+'photoslinks.json', text);
    };
    this.SetupCall('/api/rest/v1/products/'+this.currentId + '/productphotos','GET')
    await this.DoRequest();
    
  }


GetProductVariationsById= async (id) =>{
    this.currentId = id;
    this._responseFunction=async (data)=>{
      fs.writeFileSync(this.filepath + 'productvariations'+this.currentId+'.json', JSON.stringify(data));
    };
    this.SetupCall('/api/rest/v1/products/'+this.currentId+'/productvariations','GET')
    await this.DoRequest();
  }

  CreateProduct= async (obj) =>{
      this._responseFunction=async (data)=>{
      if(debug)console.log(JSON.stringify(data));
      this.productid = data.id;
      this.productobj = data;
    };
    
    this.SetupCall('/api/rest/v1/products','POST', obj)
    
    await this.DoPostRequest();
  }


  SetProductCategory = async (obj) =>{
    this._responseFunction= async (data)=>{
    if(debug)console.log(JSON.stringify(data));
  };
  
  this.SetupCall('/api/rest/v1/producttocategories','POST', obj)
  
  await this.DoPostRequest();
}

CreatePhoto = async (id,obj) =>{
  this.currentId = id;
  this._responseFunction=async (data)=>{
  console.log(JSON.stringify(data));
};
this.SetupCall('/api/rest/v1/products/'+id+'/productphotos','POST', obj)

await this.DoPostRequest();
}




GetAttributeCombinations = async (id) =>{

  this.currentId = id;

  this._responseFunction=async (data)=>{
    this.attributecombinations = data
    fs.writeFileSync(this.filepath + 'attributecombinations.json', JSON.stringify(data));
  }
  this.SetupCall('/api/rest/v1/products/'+this.currentId+'/attributecombinations','GET')
  await this.DoRequest();
  
}


GetProductPropertyGroupProperties = async (id) =>{
  this.currentId = id;
  this._responseFunction=async (data)=>{
    this.propertygroupproperties = data.items
  }
  this.SetupCall('/api/rest/v1/productpropertygroups/'+this.currentId+'/productproperties/','GET')
  await this.DoRequest();
}

  

PatchProductPropertyValue = async (id,obj) =>{
  this._responseFunction=async (data)=>{
  if(debug)console.log(JSON.stringify(data));
};

this.SetupCall('/api/rest/v1/productpropertyvalues/' + id,'PATCH', obj)

await this.DoPatchRequest();
}

PatchProductLanguageFields = async (id,obj) =>{
  this._responseFunction=async (data)=>{
  if(debug)console.log(JSON.stringify(data));
};

this.SetupCall('/api/rest/v1/products/' + id,'PATCH', obj)

await this.DoPatchRequest();
}

SetProductPropertyValue = async (prodid,propid,value) =>{
const obj = {product_id:prodid,product_property_id:propid,value:value}

  this._responseFunction= async (data)=>{
  if(debug)console.log(JSON.stringify(data));
};

this.SetupCall('/api/rest/v1/productpropertyvalues/','POST', obj)


await this.DoPostRequest();
}


PatchProductPropertyValue = async (prodid,propid,value) =>{
  const obj = {"value":value}
  
    this._responseFunction= async (data)=>{
    if(debug)console.log(JSON.stringify(data));
  };
  
  this.SetupCall('/api/rest/v1/productpropertyvalues/'+ propid,'PATCH', obj)
  
  
  await this.DoPatchRequest();
  }





GetAttributeCombinationIdByValueName = (id) =>{

  for (let n in this.attributecombinations.items){
    for (let y in this.attributecombinations.items[n].combination){
      if(this.attributecombinations.items[n].combination[y].attribute_value.name == id){
        return this.attributecombinations.items[n].id
      }
    }
  }
  
  
}



SetAttributeCombinationValues = async (id,obj) =>{
  this._responseFunction=async (data)=>{
  if(debug)console.log(JSON.stringify(data));
  this.productid = data.id;
};

this.SetupCall('/api/rest/v1/attributecombinations/' + id,'PATCH', obj)

await this.DoPatchRequest();
}


GetAttributeValueMapping = async (id) =>{

  this.currentId = id;

  if(!this.attributevaluemap){
    this._responseFunction=async (data)=>{
      this.attributevaluemap = data
      fs.writeFileSync(this.filepath + 'attributemap.json', JSON.stringify(data));
    };
    this.SetupCall('/api/rest/v1/attributes/'+this.currentId + '/attributevalues','GET')
    await this.DoRequest();
  }

  
}

GetAttributeValueId = (id) =>{

  for (let n in this.attributevaluemap.items){
    if(this.attributevaluemap.items[n].name == id){
      return this.attributevaluemap.items[n].id
    }
  }
  return null;
}


SetProductAttributeValue = async (prodid,attributeid) =>{
  this._responseFunction=async (data)=>{
  if(debug)console.log(JSON.stringify(data));
};
let obj = {"optionvalue":attributeid,"price":0};
this.SetupCall('/api/rest/v1/products/'+prodid+'/productattributevalues','POST', obj)

await this.DoPostRequest();
}

SetProductPropertyGroup = async (prodid,groupid) =>{
  this._responseFunction=async (data)=>{
  if(debug)console.log(JSON.stringify(data));
};
const obj = {product_id: prodid,product_property_group_id:groupid}
this.SetupCall('/api/rest/v1/producttopropertygroups','POST', obj)

await this.DoPostRequest();
}

DeleteProduct = async (id) =>{
  this.currentId = id;
  this._responseFunction=async (data)=>{
  if(debug)console.log(JSON.stringify(data));
};

this.SetupCall('/api/rest/v1/products/'+this.currentId ,'DELETE')

await this.DoDeleteRequest();
}


}




    
module.exports.Api = Api 


