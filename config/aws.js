// const AWS = require('aws-sdk');

// const aws=AWS.config.update({
//   accessKeyId: 'AKIASCYJ2FQPFWWTQTLG,4JmmS',
//   secretAccessKey: 'wtAyT64oT461n9E3lVufNBwylQUczbtZfp',
//   region: 'ap-south-1'
// });

// module.exports={aws}




const { S3 } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const multer = require("multer");

const s3 = new S3({
    region :'ap-south-1',
    credentials : {
        accessKeyId :"AKIASCYJ2FQPG2DBDMXQ",
        secretAccessKey :"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" ,
    }    
});

// module.exports.upload = (bucketname, directoryprefix, filename) => multer({
//     storage : multerS3({
//         s3,
//         bucket : bucketname,
//         metadata : function(req, file, cb){
//             console.log(file); 
//             cb(null, {fieldname : file.fieldname});
//         },
//         key : function(req, file, cb) {
//             cb(null, directoryprefix + filename);
//         }
//     }),
// });

module.exports.upload = (bucketname, directoryprefix) => multer({
    storage : multerS3({
        s3,
        bucket : bucketname,
        metadata : function(req, file, cb){
            console.log(file); 
            cb(null, {fieldname : file.fieldname});
        },
        key : function(req, file, cb) {
            const ext = file.mimetype.split('/')[1]; 
            cb(null, directoryprefix + `seller-${req.params.id}-${Date.now()}.${ext}`);
        }
    }),
});
module.exports.uploadBlogs = (bucketname, directoryprefix) => multer({
    storage : multerS3({
        s3,
        bucket : bucketname,
        metadata : function(req, file, cb){
            console.log(file); 
            cb(null, {fieldname : file.fieldname});
        },
        key : function(req, file, cb) {
            const ext = file.mimetype.split('/')[1]; 
            cb(null, directoryprefix + `blogs-${req.params.id}-${Date.now()}.${ext}`);
        }
    }),
});
