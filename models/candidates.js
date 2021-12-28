class Candidates {

    constructor() {
        this.candidates = [];
    }

    addCandidate(candidate = new Candidate()) {
        this.candidates.push(candidate);
    }

    getCandidates() {
        return this.candidates;
    }

    deleteCandidate(id = '') {
        this.candidates = this.candidates.filter(candidate => candidate.id !== id);
        return this.candidates;
    }

    vote(id = '') {
        this.candidates = this.candidates.map(candidate => {
            if (candidate.id === id) {
                candidate.votes++;
                return candidate;
            } else {
                return candidate;
            }
        });
    }
}

module.exports = Candidates;