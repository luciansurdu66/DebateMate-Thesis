import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoundData, createMatch } from '../../services/ChampionshipService'; // replace with the actual path to your API functions
import TeamService from '../../services/TeamService';
import Menu from '../menu'
const RoundPage = () => {
    const { id, roundNumber } = useParams();
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([])
    const [govTeam, setGovTeam] = useState('');
    const [oppTeam, setOppTeam] = useState('');

    useEffect(() => {
        TeamService.getTeams()
        .then(allTeams => {
            setTeams(allTeams.teams);
        })
        .catch(error => {
            console.error(error);
            setTeams([]); // Set teams to an empty array in case of an error
        });

    getRoundData(id, roundNumber)
        .then(data => {
            setMatches(data);
        })
        .catch(error => {
            console.error(error)
            setMatches([]); // Set matches to an empty array in case of an error    
        });
    }, [id, roundNumber]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newMatch = await createMatch({ championshipId: id, roundNumber, govTeam, oppTeam });
            setMatches(prevMatches => [...prevMatches, newMatch]);
            setGovTeam('');
            setOppTeam('');
        } catch (error) {
            console.error('Failed to create match:', error);
        }
    };

    return (
        <div>
        <Menu />
        <h1>Round {roundNumber}</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Government Team:
                <input type="text" value={govTeam} onChange={e => setGovTeam(e.target.value)} />
            </label>
            <label>
                Opposition Team:
                <input type="text" value={oppTeam} onChange={e => setOppTeam(e.target.value)} />
            </label>
            <button type="submit">Create Match</button>
        </form>
        {matches.map((match, i) => {
            // Find the government and opposition teams for this match
            const govTeam = teams.find(team => team.id === match.governmentTeamId);
            const oppTeam = teams.find(team => team.id === match.oppositionTeamId);
            return (
                <div key={i}>
                    <h2>Match {i + 1}</h2>
                    <p>Government: {govTeam ? govTeam.name : 'Loading...'}</p> {/* Display the government team name */}
                    <p>Opposition: {oppTeam ? oppTeam.name : 'Loading...'}</p> {/* Display the opposition team name */}
                    <p>Adjudicator: {match.adjudicator}</p>
                </div>
            );
        })}
    </div>
    );
};

export default RoundPage;