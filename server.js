let http = require('http');
let fs = require('fs');
let formidable = require('formidable');

http.createServer((req, res) => {
    if (req.url == '/file-upload') {
        let form = new formidable.IncomingForm(); // Nhan cac thong tin submit tu form (file, parameters)
        form.parse(req, (err, fields, files) => { // Phan tich file
            let oldPath = files.fileToUpload.filepath; // Lay duong dan file sau khi user upload file trong temp
            let newPath = 'C:/Users/nguye/' + files.fileToUpload.originalFilename;
            console.log(oldPath);
            console.log(newPath);
            fs.rename(oldPath, newPath, err => {
                // if (err) throw err;
                res.write('File Uploaded and Moved!');
                res.end();
            })
        })
    }
    else {
        fs.readFile('index.html', (err, data) => {
            res.write(data);
            return res.end();
        })
    }
}).listen(3000);