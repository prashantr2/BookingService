const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const app = express();


const setupServerAndStart = async() => {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        if (process.env.SYNC_DB) {
            db.sequelize.sync({ alter: true });
        }

        console.log(`Server up and running on PORT: ${PORT}`);
    })
}

setupServerAndStart();