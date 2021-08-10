debug=true;

const fs = require('fs');
const csv = require('@fast-csv/parse');




class Import{

    rows = [];

    constructor() {

        
    }

    Importcsv = async (file, separator) =>{
        return new Promise((resolve,reject)=>{ // return promise to make stream sync
        const stream = fs.createReadStream(file);
        let rows = [];

        csv.parseStream(stream,{ headers: true })
            .on('error', error => {
                console.error(error);
                reject(error)
            })
            .on('data', row => {
                //console.log(`ROW=${JSON.stringify(row)}`)
                if(rows == undefined){
                    rows = row
                }else{
                    const rowarray = rows
                    rowarray.push(row)
                    rows = rowarray;
                }
            })
    .       on('end', rowCount => {
                if(debug)console.log(`Parsed ${rowCount} rows`);
                resolve(rows);
                
            });

        })

    }

}//END CLASS



module.exports.Import = Import