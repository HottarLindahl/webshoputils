debug=true;
const Ccvapi =require('./ccvapi');
const imageToBase64 = require('image-to-base64');
const fs = require('fs');

let x = 0;
const api = new Ccvapi.Api('/api/rest/v1/products/37878375', "GET", "");
class PhotoUtils{

  picsFolder =''
  files = [];
  picurl ='';
  picslist = [];
  x = 0;
  mainpic = "";
    constructor() {
        this.picsFolder = './pics/';
        this.x = 0;
        this.picslist=[];
    }


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
    if(debug)console.log('createphoto')
    await api.CreatePhoto('781172393', picslist[pic]);
    if(debug)console.log(picslist[pic])
  }
  
}


CreatePicsListFromFolder = async (picsFolder) =>{
    this.mainpic='';
    this.picslist= []; //RESET
    this.x = 0;
    const files = fs.readdirSync(picsFolder);

    for(let file in files){
        let tst = '' + files[file];
        if(tst.indexOf("06")>-1){
            this.mainpic = files[file]

        }
        this.x = this.x +1;
        const resp = await imageToBase64(picsFolder + files[file] )
        this.doinsert(resp);
    
      
      }
}

CreatePicsListFromPattern = async (pattern) =>{
  this.mainpic='';
  this.picslist= []; //RESET
  this.x = 0;
  const files = fs.readdirSync(this.picsFolder);

  for(let file in files){
      let tst = '' + files[file];
      if(tst.indexOf(pattern)>-1){
        if(tst.indexOf("06")>-1){
          this.mainpic = files[file]

      }else if(tst.indexOf("6.")>-1){
        this.mainpic = files[file]
      }
      this.x = this.x +1;
      const resp = await imageToBase64(this.picsFolder + files[file] )
      this.doinsert(resp);

    }
      
  
    
    }
}


CreatePicsListFromFileList = async (pics) =>{
  this.mainpic='';
  this.picslist= []; //RESET
  this.x = 0;
  if(pics !==''){
    pics = pics.split(',');


    for(let pic in pics){
        let tst = '' + pics[pic];
        if(tst.indexOf("6")>-1){
            this.mainpic = pics[pic]
  
        }
        this.x = this.x +1;
        let file = this.picsFolder + pics[pic]
        const resp = await imageToBase64(file)
        this.doinsert(resp);
    
      
      }

  }
  
}


CreatePic = async (file, isMainPhoto) =>{
this.picslist= []; //RESET
    await imageToBase64(this.picsFolder + file ) // Path to the image
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
              if(debug)console.log(error); // Logs an error if there was one
          }
      )


}


  


}//END CLASS

module.exports.PhotoUtils = PhotoUtils



