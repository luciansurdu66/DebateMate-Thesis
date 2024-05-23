export const getRoundData = async (championshipId, roundNumber) => {
    try {
        const response = await fetch(`http://localhost:5000/api/championships/${championshipId}/rounds/${roundNumber}/matches`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch round data:', error);
    }
};

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
            body: JSON.stringify({ govTeam: match.govTeam, oppTeam: match.oppTeam }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to create match:', error);
    }
};

const ChampionshipService = {
    getRoundData,
    createChampionship,
    createMatch,
    getChampionships: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/championships');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch championships:', error);
        }
    },
};

export default ChampionshipService;