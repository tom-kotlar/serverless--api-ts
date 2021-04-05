const { BlobServiceClient } = require('@azure/storage-blob');
const connStr = process.env["Storage-ConnectionString"];

const blobServiceClient = new BlobServiceClient.fromConnectionString(connStr);
const containerName = process.env["heros-container"];


const containers = {
    heroes: blobServiceClient.getContainerClient(containerName)
  };
  
  export default containers;