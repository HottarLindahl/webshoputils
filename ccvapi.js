const axios = require('axios').default;
const CryptoJS = require('crypto-js');
const fs = require('fs');
const apikey = require('./api_key_prod.json')

const filepath = './JSON_responses/' 

getAll = function(data){
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if(debug)console.log(key + " = " + data[key]);
      
    }
  }
}

log = function(data){
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
  }
  
  //Private functions

  _SetupCall = function(sUri="/api/rest/v1/", method="GET", data=''){
    if(data){
      this.data = JSON.stringify(data);
    }
    this.filepath= filepath;
    this.sUri = sUri;
    this.method = method;
    this.sTimeStamp = new Date().toISOString();
    this.sStringToHash = this.sPublicKey + '|'+this.method+'|' + this.sUri + '|'+ this.data +'|' + this.sTimeStamp;
  }

  responseFunction=function(data){log(data)};
  sPublicKey = apikey.public_key;
  sSecretKey = apikey.private_key;
  

  DoRequest = async function(){
    await this.myClient.get(this.sUri)
  .then(response => 
    this._responseFunction(response.data), (error) => {
      if(debug)console.log(error.response.data);
      for (var n in error)
      {console.log(error[n])}
    });

    }

    DoPostRequest = async function(){
      let resp = await this.myClient.post(this.sUri,this.data)
      await this._responseFunction(resp.data)
      if(debug)console.log('donepostreq')
    }


      DoDeleteRequest = async function(){
        await this.myClient.delete(this.sUri)
      .then(response => 
        this._responseFunction(response.data), (error) => {
          if(debug)console.log(JSON.stringify(error.response.data));
          for (var n in error)
        {console.log(error[n])}
        });
        }

  GetHash = function(){
    return CryptoJS.HmacSHA512(this.sStringToHash, this.sSecretKey)
  }

  SetupCall = function(sUri, method, data){
    this._SetupCall(sUri, method, data)
    this.myClient = axios.create({
      baseURL: "https://www.mooileer.nl",
      headers: {
        'x-date': this.sTimeStamp,
        'x-hash': this.GetHash(),
        'x-public': this.sPublicKey
      }
    })
  }


  GetAllProducts= async () =>{
    this._responseFunction=async function(data){
      fs.writeFileSync(this.filepath + 'products.json', JSON.stringify(data));
    };
    this.SetupCall('/api/rest/v1/products/','GET')
    await this.DoRequest();
    

  }

    
  GetProductById= async (id) =>{
    this.currentId = id;
    this._responseFunction=async function(data){
      fs.writeFileSync(this.filepath + 'products'+this.currentId+'.json', JSON.stringify(data));
    };
    this.SetupCall('/api/rest/v1/products/'+this.currentId,'GET')
    await this.DoRequest();
  }

  GetProductPhotos = async (id) =>{
    this.currentId = id;
    this._responseFunction=function(data){
      fs.writeFileSync(this.filepath + 'products'+this.currentId+'photos.json', JSON.stringify(data));
    };
    this.SetupCall('/api/rest/v1/products/'+this.currentId + '/productphotos','GET')
    await this.DoRequest();
    
  }

  GetProductPhotosLinks = async (id) =>{
    this.currentId = id;
    this._responseFunction=function(data){
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
    this._responseFunction=async function(data){
      fs.writeFileSync(this.filepath + 'productvariations'+this.currentId+'.json', JSON.stringify(data));
    };
    this.SetupCall('/api/rest/v1/products/'+this.currentId+'/productvariations','GET')
    await this.DoRequest();
  }

  CreateProduct= async (obj) =>{
      this._responseFunction=async function(data){
      if(debug)console.log(JSON.stringify(data));
    };
    
    this.SetupCall('/api/rest/v1/products','POST', obj)
    
    await this.DoPostRequest();
  }


  SetProductCategory = async (obj) =>{
    this._responseFunction= async function(data){
    if(debug)console.log(JSON.stringify(data));
  };
  
  this.SetupCall('/api/rest/v1/producttocategories','POST', obj)
  
  await this.DoPostRequest();
}

CreatePhoto = async (id,obj) =>{
  this.currentId = id;
  this._responseFunction=async function(data){
  console.log(JSON.stringify(data));
};
this.SetupCall('/api/rest/v1/products/'+id+'/productphotos','POST', obj)

await this.DoPostRequest();
}

DeleteProduct = async (id) =>{
  this.currentId = id;
  this._responseFunction=async function(data){
  if(debug)console.log(JSON.stringify(data));
};

this.SetupCall('/api/rest/v1/products/'+this.currentId ,'DELETE')

await this.DoDeleteRequest();
}


}




    
module.exports.Api = Api 


