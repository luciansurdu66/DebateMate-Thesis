import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChampionshipService from "../../services/ChampionshipService";
import Menu from "../../components/menu";
const ChampionshipList = () => {
    const [championships, setChampionships] = useState([]);

    useEffect(() => {
        ChampionshipService.getChampionships()
            .then((data) => {
                setChampionships(data);
            })
            .catch((error) => {
                console.error(error);
                setChampionships([]);
            });
    }, []);

    return (
        <div className="relative overflow-x-auto shadow-md ">
            <Menu />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-900">
                    Championships
                </h1>
                {championships.map((championship, i) => (
                    <div key={i} className="mb-8 border rounded-lg shadow-md">
                        <h2 className="text-2xl font-medium p-4 bg-900">
                            {championship.name}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                            {[...Array(championship.rounds)].map(
                                (_, roundNumber) => (
                                    <Link
                                        key={roundNumber}
                                        to={`/championships/${
                                            championship.id
                                        }/rounds/${roundNumber + 1}`}
                                        className="text-center py-2 px-4 bg-gray-800 hover:bg-gray-700 text-slate-50 font-medium rounded-md shadow-sm"
                                    >
                                        Go to Round {roundNumber + 1}
                                    </Link>
                                )
                            )}
                            <Link
                                to={`/championships/${championship.id}/leaderboard/debaters`}
                                className="text-center py-2 px-4 bg-blue-800 hover:bg-blue-700 text-slate-50 font-medium rounded-md shadow-sm"
                            >
                                Go to Debater Leaderboard
                            </Link>
                            <Link
                                to={`/championships/${championship.id}/leaderboard/teams`}
                                className="text-center py-2 px-4 bg-blue-800 hover:bg-blue-700 text-slate-50 font-medium rounded-md shadow-sm"
                            >
                                Go to Team Leaderboard
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChampionshipList;
