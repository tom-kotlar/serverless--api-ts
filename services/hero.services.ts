import { Context } from '@azure/functions';
import containers from './config';
import { Hero } from './hero.model';


async function getHeroes({ req, res }: Context) {
  try {
    const response = await req.body
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send(error);
  }
}


async function getHero({ req, res }: Context) {
  try {
    const response = await req.body
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send(error);
  }
}

async function postHero({ req, res }: Context) {

  const hero: Hero = {
    ID: req.query.id,
    NAME: req.body.NAME,
    HEIGHT: req.body.HEIGHT,
    WEIGHT: req.body.WEIGHT,
    GENDER: req.body.GENDER,
    EYES: req.body.EYES,
    HAIR: req.body.HAIR,
    UNIVERSE: req.body.UNIVERSE,
    IDENTITY: req.body.IDENTITY,
    POWERS: req.body.POWERS,
    GROUPAFFILIATION: req.body.GROUPAFFILIATION
  }

  const blockBlobClient = containers.heroes.getBlockBlobClient(`avengers/${req.query.id}.json`);

  try {
    await blockBlobClient.upload(JSON.stringify(hero), JSON.stringify(hero).length)

// download created Blob from Azure Blob Storage 
    const downloadBlockBlobResponse = await blockBlobClient.download();
    const newHero = (await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)).toString();

// create & download snapsot from Azure Blob Storage 

    //   const snapshotResponse = await blockBlobClient.createSnapshot();
    //   const blobSnapshotClient = blockBlobClient.withSnapshot(snapshotResponse.snapshot!);
    //   const response = await blobSnapshotClient.download(0);
    //   const newHero =  (await streamToBuffer(response.readableStreamBody!)).toString()
    res.status(201).json(newHero);
  } catch (error) {
    res.status(500).send(error);
  }
// helper  method for converting the buffer steam 
  async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on("data", (data) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on("error", reject);
    });
  }


  // const containerClient = blobServiceClient.getContainerClient(containerName);

  // let i = 1;
  // let blobs = containerClient.listBlobsFlat();
  // let blobs = containers.heroes.listBlobsFlat();
  // for await (const blob of blobs) {
  //   console.log(`Blob ${i++}: ${blob.name}`);
  // }



}





export default { getHeroes, getHero, postHero };

