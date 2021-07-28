debug=true;

const fs = require('fs');
const csv = require('@fast-csv/parse');



class Import{

    constructor() {
        
    }

    Importcsv = async (file, separator) =>{
        const stream = fs.createReadStream(file);

        csv.parseStream(stream,{ headers: true })
            .on('error', error => console.error(error))
            .on('data', row => {
                //console.log(`ROW=${JSON.stringify(row)}`)
                console.log(`EAN=${JSON.stringify(row.EAN)}`)
            })
    .       on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

    }

}//END CLASS



module.exports.Import = Import