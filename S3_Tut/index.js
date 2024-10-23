const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "eu-north-1",
  
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "suraj-private-bucket",
    Key: key,
  });
  const url = getSignedUrl(s3Client, command);
  return url;
}

async function putObject(fileName, contentType) {
  const command = new PutObjectCommand({
    Bucket: "suraj-private-bucket",
    Key: `uploads/user-uploads/${fileName}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function init() {
  // console.log("Get URL", getObjectURL("Wallpaper.jpg"));
  console.log("Put URL", await putObject("image123.jpg", "image/jpeg"));
}
init();
