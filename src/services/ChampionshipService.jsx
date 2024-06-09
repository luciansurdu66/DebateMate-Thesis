export const getRoundData = async (championshipId, roundNumber) => {
    try {
        const response = await fetch(`http://localhost:5000/api/championships/${championshipId}/rounds/${roundNumber}/matches`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch round data:', error);
    }
};

export const getMatchData = async (matchId) => {
    try {
        const response = await fetch('http://localhost:5000/api/matches/' + matchId);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Failed to fetch match data:', error);
    }
}

export const createChampionship = async (championship) => {
    try {
        const response = await fetch('http://localhost:5000/api/championships/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(championship),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to create championship:', error);
    }
};

export const createMatch = async (match) => {
    try {
        const response = await fetch(`http://localhost:5000/api/championships/${match.championshipId}/rounds/${match.roundNumber}/matches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ govTeam: match.govTeam, oppTeam: match.oppTeam, adjudicator: match.adjudicator }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to create match:', error);
    }
};

export const createScore = async (championshipId, roundNumber, matchId, TeamId, debaterId, adjudicatorId, score) => {
    try {
        const response = await fetch(`http://localhost:5000/api/matches/score`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({championshipId: championshipId, roundNumber: roundNumber, matchId: matchId, teamId: TeamId, debaterId, adjudicatorId, score }),
        });
        const data = await response.json();
        return data;
    
    }
    catch (error) {
        console.error('Failed to create score:', error);
    }
}

export const getScores = async (championshipId) => {
    try{
        const response = await fetch(`http://localhost:5000/api/matches/score/championship/${championshipId}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Failed to fetch scores:', error);
    
    }
}
const ChampionshipService = {
    getRoundData,
    createChampionship,
    createMatch,
    createScore,
    getChampionships: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/championships');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch championships:', error);
        }
    },

    getChampionship: async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/championships/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch championship:', error);
        }
    },
};

export default ChampionshipService;