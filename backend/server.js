//Dependancies 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

const userRoute = require('./routes/UserRoutes');
const drugRoute = require('./routes/DrugRoute');
const supplierRoute = require('./routes/SupplierRoute');
const sellsRoute = require('./routes/SellsRoute');
const doctorRoute = require('./routes/DoctorRoute');
const appoinmentRoute = require('./routes/AppoinmentRoute');

//Utilize Express
const app = express();

// --Server Creation--
//Get Port ID
const PORT = process.env.PORT || 8080; //Default port 8080

app.use(cors());
app.use(bodyParser.json());

//Database Connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    //Options
});

//Create Connection
const connection = mongoose.connection;

//Connection with Database
try {
    connection.once("open", () => {
    console.log("Connect to the Database!")
    });
} catch (error) {
    console.log("Error with Database Connection" + error);
}

app.use('/api/user', userRoute);
app.use('/api/drug', drugRoute);
app.use('/api/supplier', supplierRoute);
app.use('/api/sells', sellsRoute);
app.use('/api/doctors', doctorRoute);
app.use('/api/appoinments', appoinmentRoute);

//Load to the Port
try {
    app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
    });
} catch (error) {
    console.log("Error with Server" + error);
}
