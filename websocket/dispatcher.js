// ------ REQUIRE ------
const WebSocket = require('ws');

// ------ LOGGER ------
const { createLogger } = require('../config');

// ------ VARIABLES ------
let tabCreateUsers = [];

// ------ FUNCTIONS ------
exports.createBackendDispatcher = function(server) {
    // SETUP
    const logger = createLogger('Websocket Odos');

    // COMMUNICATIONS
    const wss = new WebSocket.Server({
        server
    });

    // Handle new user connections.
    wss.on('connection', function(ws) {
        logger.info('New WebSocket user connected');
        tabCreateUsers.push(ws);

        // Forget the mapping when the client disconnects.
        ws.on('close', () => {
            logger.info(`You are disconnected`);
            delete tabCreateUsers[0];
        });
    });
};

// Counting the number of users
exports.nbUsers = function(users){
    tabCreateUsers.forEach(ws => {
        ws.send('There are ' + users + ' users');
    })
};

// Counting the number of pictures
exports.nbPictures = function(pictures){
    tabCreateUsers.forEach(ws => {
        ws.send('There are ' + pictures + ' pictures');
    })
};

// Counting the number of lists
exports.nbListss = function(lists){
    tabCreateUsers.forEach(ws => {
        ws.send('There are ' + lists + ' lists');
    })
};