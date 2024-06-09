import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getScores } from "../../services/ChampionshipService";
import TeamService from "../../services/TeamService";
import Menu from "../../components/menu";
import ChampionshipService from "../../services/ChampionshipService";

const TeamLeaderboardPage = () => {
    const [scores, setScores] = useState([]);
    const [teams, setTeams] = useState([]);
    const [championship, setChampionship] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getScores(id)
            .then((data) => {
                // Sort scores in descending order
                data.sort((a, b) => b.score - a.score);
                setScores(data);

                // Fetch team for each score
            })
            .catch((error) => {
                console.error(error);
                setScores([]); // Set scores to an empty array in case of an error
            });
        TeamService.getTeams()
            .then((data) => {
                setTeams(data.teams);
            })
            .catch((error) => {
                console.error(error);
                setTeams([]); // Set teams to an empty array in case of an error
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

    let maxRoundNumber = 0;
    if (championship) {
        maxRoundNumber = championship.rounds;
    }
    const calculateStandardDeviation = (values) => {
        const mean =
            values.reduce((total, value) => total + value, 0) / values.length;

        const squaredDifferences = values.map((value) => {
            const difference = value - mean;
            const squaredDifference = difference * difference;
            return squaredDifference;
        });

        const meanOfSquaredDifferences =
            squaredDifferences.reduce((total, value) => total + value, 0) /
            squaredDifferences.length;

        const standardDeviation = Math.sqrt(meanOfSquaredDifferences);
        return standardDeviation;
    };

    const totalScores = teams.map((team) => {
        const teamScores = scores.filter((score) => score.teamId === team.id);
        const totalScore = teamScores.reduce(
            (total, score) => total + score.score,
            0
        );
        const stdDev = calculateStandardDeviation(
            teamScores.map((score) => score.score)
        );

        const scoresPerRound = [...Array(maxRoundNumber)].map((_, i) => {
            const roundScores = teamScores.filter(
                (score) => score.roundNumber === i + 1
            );
            return roundScores.reduce((total, score) => total + score.score, 0);
        });
        console.log(scoresPerRound);

        return {
            team,
            totalScore,
            averageScore: totalScore / maxRoundNumber,
            scores: scoresPerRound, 
            stdDev,
        };
    });

    totalScores.sort(
        (a, b) => b.totalScore - a.totalScore || b.stdDev - a.stdDev
    );

    let rank = 0;
    let prevScore = totalScores.length > 0 ? totalScores[0].totalScore : 0;
    totalScores.forEach((item, index) => {
        if (item.totalScore < prevScore) {
            rank++;
        }
        item.rank =
            index > 0 && totalScores[index - 1].totalScore === item.totalScore
                && totalScores[index - 1].stdDev === item.stdDev
                ? `=`
                : rank +1;
        prevScore = item.totalScore;
    });

    return (
        <div className="relative overflow-x-auto shadow-md ">
            <Menu />
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold mb-2">Team Leaderboard</h1>{" "}
            </div>
            <div className="px-4 py-2 flex justify-center">
                <table className="table table-bordered border-gray-300">
                    <thead>
                        <tr>
                            <th className="text-left border px-4 py-2">Rank</th>
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
                        {totalScores.map((item, index) => (
                            <tr
                                key={item.team.id}
                                className="border-b border-gray-300"
                            >
                                <td className="text-left border px-4 py-2">
                                    {item.rank}
                                </td>
                                <td className="text-left border px-4 py-2">
                                    {item.team.name}
                                </td>
                                {item.scores.map((score, i) => (
                                    <td
                                        key={i}
                                        className="text-center border px-4 py-2"
                                    >
                                        {score || "N/A"}
                                    </td>
                                ))}
                                <td className="text-center border px-4 py-2">
                                    {item.totalScore}
                                </td>
                                <td className="text-center border px-4 py-2">
                                    {item.stdDev.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamLeaderboardPage;
