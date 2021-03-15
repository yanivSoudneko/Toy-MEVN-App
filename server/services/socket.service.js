const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');
const toyService = require('../api/toys/toy.service');
var gIo = null;
var gSocketBySessionIdMap = {};

function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: [
                'http://127.0.0.1:8080',
                'http://localhost:8080',
                'http://127.0.0.1:3000',
                'http://localhost:3000',
            ],
            methods: ['GET', 'POST'],
        },
    });

    const sharedSession = require('express-socket.io-session');

    gIo.use(
        sharedSession(session, {
            autoSave: true,
        })
    );
    gIo.on('connection', (socket) => {
        console.log('contected');
        // console.log('socket.handshake', socket.handshake)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket;
        // TODO: emitToUser feature - need to tested for CaJan21
        // if (socket.handshake?.session?.user) socket.join(socket.handshake.session.user._id)
        socket.on('disconnect', (socket) => {
            console.log('Someone disconnected');
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null;
            }
        });
        socket.on('chat topic', (topic) => {
            if (socket.myTopic === topic) return;
            if (socket.myTopic) {
                socket.leave(socket.myTopic);
            }
            socket.join(topic);
            // logger.debug('Session ID is', socket.handshake.sessionID)
            socket.myTopic = topic;
            console.log(
                '🚀 ~ file: socket.service.js ~ line 42 ~ connectSockets ~ socket.myTopic',
                socket.myTopic
            );
        });
        socket.on('chat newMsg', (msg) => {
            console.log(
                '🚀 ~ file: socket.service.js ~ line 38 ~ connectSockets ~ msg',
                msg
            );
            toyService.saveToyChat(msg).catch((err) => {
                console.log('shit', err);
            });
            // emits to all sockets:
            // gIo.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            // console.log("🚀 ~ file: socket.service.js ~ line 43 ~ connectSockets ~ socket.myTopic", socket.myTopic)
            gIo.to(socket.myTopic).emit('chat addMsg', msg);
        });
    });
}

function emit({ type, data }) {
    gIo.emit(type, data);
}

// TODO: Need to test emitToUser feature
function emitToUser({ type, data, userId }) {
    gIo.to(userId).emit(type, data);
}

// Send to all sockets BUT not the current socket
function broadcast({ type, data }) {
    const store = asyncLocalStorage.getStore();
    const { sessionId } = store;
    if (!sessionId)
        return logger.debug(
            'Shoudnt happen, no sessionId in asyncLocalStorage store'
        );
    const excludedSocket = gSocketBySessionIdMap[sessionId];
    if (!excludedSocket)
        return logger.debug(
            'Shouldnt happen, No socket in map',
            gSocketBySessionIdMap
        );
    excludedSocket.broadcast.emit(type, data);
}

module.exports = {
    connectSockets,
    emit,
    broadcast,
};
