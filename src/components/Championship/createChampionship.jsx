import React, { useState, useEffect } from 'react';
import { createChampionship } from '../../services/ChampionshipService';
import TeamService from '../../services/TeamService'
import Menu from '../menu'
const CreateChampionship = () => {
    const [name, setName] = useState('');
    const [rounds, setRounds] = useState(1);
    const [teams, setTeams] = useState([])

    useEffect(() => {
        TeamService.getTeams()
        .then(response => {
            setTeams(response.teams);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    },[]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createChampionship({ name, rounds, teams });
            // handle success (e.g. redirect to championships list)
        } catch (error) {
            // handle error
        }
    };

    return (
        <div>
            <Menu />
            <h1>Create Championship</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Rounds:
                <input type="number" value={rounds} onChange={e => setRounds(e.target.value)} />
            </label>
            <button type="submit">Create Championship</button>
        </form>
        </div>
    );
};

export default CreateChampionship;