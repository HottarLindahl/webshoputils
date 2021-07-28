debug=true;
const Ccvapi =require('./ccvapi');
const PhotoUtils=require('./photoutils');
const picsFolder = './pics/';
const fs = require('fs');

const photoutils = new PhotoUtils.PhotoUtils();
const api = new Ccvapi.Api('/api/rest/v1/products', "GET", "");


class Tests{

    constructor() {
        
    }

    Basics = async () =>{
        if(debug)console.log('api.GetAllProducts');
        await api.GetAllProducts()
        if(debug)console.log('Done! \n');
        if(debug)console.log('api.GetProductById');
        await api.GetProductById('781172393')
        if(debug)console.log('Done! \n');
    }

}//END CLASS

module.exports.Tests = Tests