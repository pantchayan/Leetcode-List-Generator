let xlsx =require("xlsx");

let writeData = (data, filePath, name) => {
       let file = xlsx.readFile(filePath);
       
       let newSheet = xlsx.utils.json_to_sheet(data);

       xlsx.utils.book_append_sheet(file, newSheet, name);

       xlsx.writeFile(file, filePath);
}

module.exports.writeData = writeData;