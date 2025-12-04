import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/graphql");
        console.log("mongodb connected");
    } catch (err) {
        console.log(`ERROR : mongodb connect failed ${err}`);
    }
}

