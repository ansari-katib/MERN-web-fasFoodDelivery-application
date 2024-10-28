import mongoose from "mongoose";
const mongoURL = 'mongodb+srv://ansarikatib647:rjIln4Vw6FaRJ462@cluster0.ftc8g.mongodb.net/AK-Foods?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected successfully");

    // Fetch data from the foodItem collection
    const foodItemCollection = mongoose.connection.db.collection("foodItem");
    const foodItems = await foodItemCollection.find({}).toArray(); // No callback needed

    // Fetch data from the foodCategory collection
    const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
    const foodCategories = await foodCategoryCollection.find({}).toArray(); // No callback needed

    // Assigning data to global variables
    global.food_item = foodItems;
    global.food_Category = foodCategories;
    
    // message that data fetch successfully 
    console.log("Data fetched and stored globally.");

  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
};

export default mongoDB;
