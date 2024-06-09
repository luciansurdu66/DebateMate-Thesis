import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getScores } from "../../services/ChampionshipService";
import DebaterService from "../../services/DebaterService";
import Menu from "../../components/menu";
import ChampionshipService from "../../services/ChampionshipService";

const DebaterLeaderboardPage = () => {
    const [scores, setScores] = useState([]);
    const [debaters, setDebaters] = useState([]);
    const [championship, setChampionship] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getScores(id)
            .then((data) => {
                // Sort scores in descending order
                data.sort((a, b) => b.score - a.score);
                setScores(data);

                // Fetch debater for each score
            })
            .catch((error) => {
                console.error(error);
                setScores([]); // Set scores to an empty array in case of an error
            });
        DebaterService.getDebaters()
            .then((data) => {
                setDebaters(data.debaters);
            })
            .catch((error) => {
                console.error(error);
                setDebaters([]); // Set debaters to an empty array in case of an error
            });
        ChampionshipService.getChampionship(id)
            .then((data) => {
                setChampionship(data);
            })
            .catch((error) => {
                console.error(error);
                setChampionship(null); // Set championship to null in case of an error
            });
    }, [id]);

    console.log(scores);
    let maxRoundNumber = 0;
    if (championship) {
        maxRoundNumber = championship.rounds;
    }

    const totalScores = debaters.map((debater) => {
        const debaterScores = scores
            .filter((score) => score.debaterId === debater.id)
            .map((score) => score.score);
        const totalScore = debaterScores.reduce(
            (total, score) => total + score,
            0
        );
        const mean = totalScore / debaterScores.length;
        const variance =
            debaterScores.reduce(
                (total, score) => total + Math.pow(score - mean, 2),
                0
            ) / debaterScores.length;
        const standardDeviation = Math.sqrt(variance);
        return { ...debater, totalScore, standardDeviation };
    });

    totalScores.sort((a, b) => {
        if (b.totalScore - a.totalScore !== 0) {
            return b.totalScore - a.totalScore;
        } else if (a.standardDeviation - b.standardDeviation !== 0) {
            return a.standardDeviation - b.standardDeviation;
        } else {
            return a.name.localeCompare(b.name);
        }
    });
    
    return (
        <div className="relative overflow-x-auto shadow-md ">
            <Menu />
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold mb-2">Debater Leaderboard</h1>{" "}
            </div>
            <div className="px-4 py-2 flex justify-center">
                <table className="table table-bordered border-gray-300">
                    <thead>
                        <tr>
                            <th className="text-left border px-4 py-2">Rank</th>
                            <th className="text-left border px-4 py-2">
                                Debater
                            </th>
                            <th className="text-left border px-4 py-2">Echipă</th>
                            {[...Array(maxRoundNumber)].map((_, i) => (
                                <th
                                    key={i}
                                    className="text-center border px-4 py-2"
                                >
                                    Punctaj Round {i + 1}
                                </th>
                            ))}
                            <th className="text-center border px-4 py-2">
                                Punctaj Total
                            </th>
                            <th className="text-center border px-4 py-2">
                                Deviație Standard
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalScores.map((debater, index, array) => {
                            const previousDebater = array[index - 1];
                            const rank =
                                previousDebater &&
                                previousDebater.totalScore ===
                                    debater.totalScore &&
                                previousDebater.standardDeviation.toFixed(2) ===
                                    debater.standardDeviation.toFixed(2)
                                    ? "="
                                    : index + 1;
                            return (
                                <tr
                                    key={debater.id}
                                    className="border-b border-gray-300"
                                >
                                    <td className="text-left border px-4 py-2">
                                        {rank}
                                    </td>
                                    <td className="text-left border px-4 py-2">
                                        {debater.name}
                                    </td>
                                    <td className="text-left border px-4 py-2">
                                        {debater.team}
                                    </td>
                                    {[...Array(maxRoundNumber)].map((_, i) => {
                                        const roundScore = scores.find(
                                            (score) =>
                                                score.debaterId ===
                                                    debater.id &&
                                                score.roundNumber === i + 1
                                        );
                                        return (
                                            <td
                                                key={i}
                                                className="text-center border px-4 py-2"
                                            >
                                                {roundScore
                                                    ? roundScore.score
                                                    : "N/A"}
                                            </td>
                                        );
                                    })}
                                    <td className="text-center border px-4 py-2">
                                        {debater.totalScore}
                                    </td>
                                    <td className="text-center border px-4 py-2">
                                        {debater.standardDeviation.toFixed(2)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DebaterLeaderboardPage;
