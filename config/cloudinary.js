import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
// cloud_name: "djhu4t2ip",
// api_key: "452989588391894",
// api_secret: "Ol_CsbyOU7rC7kSDjOE"
});

export default cloudinary;