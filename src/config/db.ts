
import mongoose, { ConnectOptions, MongooseError } from "mongoose";
const MONGO_URL=process.env.MONGO_URL || "400"
export async function connectDb(){
  try{
    await mongoose.connect(
        MONGO_URL, 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as ConnectOptions
    );
    console.log("Connect Succesfully to DB");
  }catch(err){
    console.log(err);
    process.exit(1);
  }

}