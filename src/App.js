import React ,{ useState, useEffect } from 'react';
import AWS from 'aws-sdk';


const S3_BUCKET ='XXXX';
const REGION = 'XXXXX';
//Reference AWS credentials from credentials file
AWS.config.update({
    accessKeyId: 'XXXXXXXXXXXXXXXXXXXXX',
    secretAccessKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 
});

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})
//Image Upload Function
const UploadImageToS3 = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name,
            LastModified: file.lastModified,
            Size: file.Size,
            Time: file.Time,
            Type: file.Type
        };
    }

    return <div align="center">
        <h1>Your S3 Gallery</h1>
        <input type="file" onChange={handleFileInput}/>
        <button className='upload-button' onClick={() => uploadFile(selectedFile)}> Upload to S3 </button>
    </div>
}
//Listing S3 Images Function
const ImageList = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        myBucket.listObjects({ Delimiter: '/' }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                setImages(data.Contents);
            }
        })
    }, [])
    console.log(images);
//Create a table to list images
    return <div align="center">
         <h1>Image List</h1>
         <table style={{ border: '2px solid black' }}>
             <thead>
                 <tr>
                     <th style={{margin: '100px'}}> Image </th>
                     <th style={{margin: '100px'}}>Name</th>
                     <th style={{margin: '100px'}}>Size</th>
                     <th style={{margin: '100px'}}>StorageClass</th>
                 </tr>
             </thead>
            <tbody>
                 {images.map(image => {
                     return <tr key={image.Key}>
                            <td style={{padding: '25px'}}> <img style={{ width: '200px', height: '200px' }} src={`https://s3-${REGION}.amazonaws.com/${S3_BUCKET}/${image.Key}`} alt=""/></td>
                            <td style={{padding: '25px'}}>{image.Key}</td>
                            <td style={{padding: '25px'}}>{image.Size}</td>
                            <td style={{padding: '25px'}}>{image.StorageClass}</td>
                     </tr>
                 }
                 )}
             </tbody>
         </table>
     </div>
     }
    
    
export default () => {
    return (
        <>
            <UploadImageToS3 />
            <ImageList />
        </>
    )
}
