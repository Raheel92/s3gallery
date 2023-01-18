//import react,useState,App,react-dom
import React, {useState} from 'react';
//import S3FileUpload from react-s3
import S3FileUpload from 'react-s3';
import './App.css';

//create a variable named myBucket and assign it the name of your bucket
const myBucket = 'my-bucket-name';
//create variables for AWS credentials like region, accessKeyId, secretAccessKey
const region = 'us-east-1';
const accessKeyId = 'XXXXXXXXXXXXXXXXX';
const secretAccessKey = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

//Configure AWS config credentials
const config = {
    bucketName: myBucket,
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    successActionStatus: 201
}

//Write a function that uploads a file to S3 and takes in a file object as user input
function uploadFile() {
    //create a new instance of S3FileUpload
    const fileUpload = new S3FileUpload(config);
    //call the upload method on the fileUpload instance with the file object as the argument
    fileUpload.upload(file).then(data => {
        //log the data to the console
        console.log(data);
    });
    //create a variable named file and assign it the value of the user input
    const file = document.getElementById('file');
    //create a function that takes in a file object as an argument
    function handleFile(file) {
      //call the uploadFile function with the file object as the argument
      uploadFile(file);
    }
    //add an event listener to the file input
    file.addEventListener('change', (e) => {
    //call the uploadFile function with the file object as the argument
      uploadFile(e.target.files[0]);
      }
    );
    //Return a div with a label that says "Upload a file" and an input element with type "file" and button that says "Upload" that calls the handleFile function
    return <div>
      <div>Upload a file</div>
        <input type="file" onChange={handleFile}/>
        <button onClick={handleFile}>Upload</button>
    </div>
  }

export default uploadFile;
