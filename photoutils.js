const Ccvapi =require('./ccvapi');
const imageToBase64 = require('image-to-base64');
const fs = require('fs');

let x = 0;
const api = new Ccvapi.Api('/api/rest/v1/products/37878375', "GET", "");
class PhotoUtils{

    constructor() {
        this.picsFolder = './pics/';
        this.x = 0;
        this.picslist=[];
    }
picsFolder =''
files = [];
picurl ='';
picslist = [];
x = 0;
mainpic = "";

doinsert= async(response) => {
    if(this.mainpic != ''){
     this.picslist.push(
       {
         "file_type": "jpg",
         "source":response,
         "is_mainphoto": true
       }
      ); 
      this.mainpic= '';
    }else{
     this.picslist.push(
       {
         "file_type": "jpg",
         "source":response,
         "is_mainphoto": false
       }

      );
    }
}


GetPicsList= () =>{
    return this.picslist
}

UploadList= async(picslist) =>{
  for(let pic in picslist){
    console.log('createphoto')
    await api.CreatePhoto('781172393', picslist[pic]);
    console.log(picslist[pic])
  }
  
}


CreatePicsList = async (picsFolder) =>{
    this.mainpic='';
    this.picslist= []; //RESET
    this.x = 0;
    const files = fs.readdirSync(picsFolder);

    for(let file in files){
        let tst = '' + files[file];
        if(tst.indexOf("6")>-1){
            this.mainpic = files[file]

        }
        console.log('nu')
        this.x = this.x +1;
        const resp = await imageToBase64(picsFolder + files[file] )
        this.doinsert(resp);
        console.log('nu2')
    
        
      
      }
}


CreatePic = async (file, isMainPhoto) =>{
this.picslist= []; //RESET
    await imageToBase64(picsFolder + file ) // Path to the image
      .then(
          (response)=> {
              this.picslist.push(
                {
                  "file_type": "jpg",
                  "source":response,
                  "is_mainphoto": isMainPhoto
                }
    
               ); // "cGF0aC90by9maWxlLmpwZw=="
             
          }
      )
      .catch(
          (error) => {
              console.log(error); // Logs an error if there was one
          }
      )


}


  


}//END CLASS

module.exports.PhotoUtils = PhotoUtils



