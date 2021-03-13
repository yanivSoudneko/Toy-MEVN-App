require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const expressSession = require('express-session');

const app = express();
const http = require('http').createServer(app);

const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
});
// Express App Config
app.use(express.json());
app.use(session);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080'],
        credentials: true,
    };
    app.use(cors(corsOptions));
}

const mainRouter = require('./main.routes');
// app.use((req, res, next) => {
//     console.log(req.url);
//     next();
// });
app.use('/api', mainRouter);

const port = process.env.PORT || 3030;
http.listen(port, () => {
    console.info('Server is running on port: ' + port);
    console.info('login:' + process.env.TEST_VAR);
});
