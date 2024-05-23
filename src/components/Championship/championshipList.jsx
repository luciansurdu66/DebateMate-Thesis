import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChampionshipService from '../../services/ChampionshipService'; // replace with the actual path to ChampionshipService
import Menu from '../../components/menu'
const ChampionshipList = () => {
    const [championships, setChampionships] = useState([]);

    useEffect(() => {
        ChampionshipService.getChampionships()
            .then(data => {
                setChampionships(data);
            })
            .catch(error => {
                console.error(error);
                setChampionships([]); // Set championships to an empty array in case of an error
            });
    }, []);

    return (
        <div class="relative overflow-x-auto shadow-md ">
            <Menu />
            <h1>Championships</h1>
            {championships.map((championship, i) => (
                <div key={i}>
                    <h2>{championship.name}</h2>
                    {[...Array(championship.rounds)].map((_, roundNumber) => (
                        <Link key={roundNumber} to={`/championships/${championship.id}/rounds/${roundNumber + 1}`}>
                            <button>Go to Round {roundNumber + 1}</button>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ChampionshipList;