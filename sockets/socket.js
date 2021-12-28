const {io} = require('../index.js');
const Candidate = require('../models/candidate.js');
const Candidates = require('../models/candidates.js');

const candidates = new Candidates();

candidates.addCandidate(new Candidate('Ladino'));
candidates.addCandidate(new Candidate('Lena'));
candidates.addCandidate(new Candidate('Kezia'));
candidates.addCandidate(new Candidate('Safira'));

// sockets messages
io.on('connection', client => {
    
    client.on('disconnect', () => { 
        console.log("cliente disconectado");
    });
    
    // emit candidates to connected client
    client.emit('active-candidates', candidates.getCandidates());

    client.on('vote', function(payload) {
        candidates.vote(payload.id);
        io.emit('active-candidates', candidates.getCandidates()); // emit updated votes to all connected clients
    })

    client.on('add-candidate', (payload) => {
        candidates.addCandidate(new Candidate(payload.name));
        io.emit('active-candidates', candidates.getCandidates()); // emit updated votes to all connected clients
    })

    client.on('delete-candidate', (payload) => {
        candidates.deleteCandidate(payload.id)
        io.emit('active-candidates', candidates.getCandidates()); // emit updated votes to all connected clients
    })

});