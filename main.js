const express = require('express');
const app = express();
const profileService = require('./services/profile-service');
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

app.use('/profile', profileService);
app.listen(8081);
