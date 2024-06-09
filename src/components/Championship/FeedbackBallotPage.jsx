import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatchData } from "../../services/ChampionshipService";
import TeamService from "../../services/TeamService";
import DebaterService from "../../services/DebaterService";
import ChampionshipService from "../../services/ChampionshipService";
const FeedbackBallotPage = () => {
    const { id } = useParams();
    const [match, setMatch] = useState(null);
    const [govTeam, setGovTeam] = useState(null);
    const [oppTeam, setOppTeam] = useState(null);
    const [gov1, setGov1] = useState(null);
    const [gov2, setGov2] = useState(null);
    const [gov3, setGov3] = useState(null);
    const [opp1, setOpp1] = useState(null);
    const [opp2, setOpp2] = useState(null);
    const [opp3, setOpp3] = useState(null);
    const [gov1Score, setGov1Score] = useState("");
    const [gov2Score, setGov2Score] = useState("");
    const [gov3Score, setGov3Score] = useState("");
    const [opp1Score, setOpp1Score] = useState("");
    const [opp2Score, setOpp2Score] = useState("");
    const [opp3Score, setOpp3Score] = useState("");
    useEffect(() => {
        getMatchData(id)
            .then((data) => {
                setMatch(data);
                return Promise.all([
                    TeamService.getTeam(data.governmentTeamId),
                    TeamService.getTeam(data.oppositionTeamId),
                ]);
            })
            .then(([govData, oppData]) => {
                setGovTeam(govData.team);
                setOppTeam(oppData.team);
                return Promise.all([
                    DebaterService.getDebater(govData.team.debater1Id),
                    DebaterService.getDebater(govData.team.debater2Id),
                    DebaterService.getDebater(govData.team.debater3Id),
                    DebaterService.getDebater(oppData.team.debater1Id),
                    DebaterService.getDebater(oppData.team.debater2Id),
                    DebaterService.getDebater(oppData.team.debater3Id),
                ]);
            })
            .then(
                ([gov1Data, gov2Data, gov3Data, opp1Data, opp2Data, opp3Data]) => {
                    setGov1(gov1Data.debater);
                    setGov2(gov2Data.debater);
                    setGov3(gov3Data.debater);
                    setOpp1(opp1Data.debater);
                    setOpp2(opp2Data.debater);
                    setOpp3(opp3Data.debater);
                }
            )
            .catch((error) => {
                console.error(error);
                setMatch([]); // Set matches to an empty array in case of an error
            });
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const scores = [gov1Score,
                gov2Score,
                gov3Score,
                opp1Score,
                opp2Score,
                opp3Score]
            for (let score of scores) {
                if (score <65 || score >75){
                    alert("Scorurile trebuie sa fie intre 65 si 75!")
                    return
                }
            }

            const createScore = async (teamId, memberId, score) => {
                return ChampionshipService.createScore(
                    match.championshipId,
                    match.roundNumber,
                    match.id,
                    teamId,
                    memberId,
                    match.adjudicatorId,
                    score
                );
            };
            await Promise.all([
                createScore(govTeam.id, gov1.id, gov1Score),
                createScore(govTeam.id, gov2.id, gov2Score),
                createScore(govTeam.id, gov3.id, gov3Score),
                createScore(oppTeam.id, opp1.id, opp1Score),
                createScore(oppTeam.id, opp2.id, opp2Score),
                createScore(oppTeam.id, opp3.id, opp3Score),
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    if (!match || !govTeam || !oppTeam) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 ">
            <h1 className="flex justify-center text-xl font-bold my-4">
                Feedback for Match {match.id}
            </h1>
            <div className="flex flex-col space-y-4 text-xl font-bold">
                <div className="flex justify-center items-center bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-bold">
                        {" "}
                        Government Team: {govTeam.name}
                    </h2>{" "}
                </div>
                <div className="flex justify-center items-center bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-bold">
                        Opposition Team: {oppTeam.name}
                    </h2>
                </div>
            </div>

            <h2 className="flex justify-center text-xl font-bold my-4">
                Debater Scores
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
            >
                {gov1 && (
                    <div className="flex items-center space-x-4">
                        <p className="font-medium">G1 {gov1.name}</p>
                        <input
                            type="number"
                            value={gov1Score}
                            onChange={(e) => setGov1Score(e.target.value)}
                            required
                            className="border border-gray-300 rounded-md px-2 py-1"
                        />
                    </div>
                )}
                {gov2 && (
                    <div className="flex items-center space-x-4">
                        <p className="font-medium">G2 {gov2.name}</p>
                        <input
                            type="number"
                            value={gov2Score}
                            onChange={(e) => setGov2Score(e.target.value)}
                            required
                            className="border border-gray-300 rounded-md px-2 py-1"
                        />
                    </div>
                )}
                {gov3 && (
                    <div className="flex items-center space-x-4">
                        <p className="font-medium"> G3 {gov3.name}</p>
                        <input
                            type="number"
                            value={gov3Score}
                            onChange={(e) => setGov3Score(e.target.value)}
                            required
                            className="border border-gray-300 rounded-md px-2 py-1"
                        />
                    </div>
                )}
                {opp1 && (
                    <div className="flex items-center space-x-4">
                        <p className="font-medium">O1 {opp1.name}</p>
                        <input
                            type="number"
                            value={opp1Score}
                            onChange={(e) => setOpp1Score(e.target.value)}
                            required
                            className="border border-gray-300 rounded-md px-2 py-1"
                        />
                    </div>
                )}
                {opp2 && (
                    <div className="flex items-center space-x-4">
                        <p className="font-medium">O2 {opp2.name}</p>
                        <input
                            type="number"
                            value={opp2Score}
                            onChange={(e) => setOpp2Score(e.target.value)}
                            required
                            className="border border-gray-300 rounded-md px-2 py-1"
                        />
                    </div>
                )}
                {opp3 && (
                    <div className="flex items-center space-x-4">
                        <p className="font-medium">O3 {opp3.name}</p>
                        <input
                            type="number"
                            value={opp3Score}
                            onChange={(e) => setOpp3Score(e.target.value)}
                            required
                            className="border border-gray-300 rounded-md px-2 py-1"
                        />
                    </div>
                )}
            <div className="justify-content-center">
                {" "}
                {/* Center button in this column */}
                <button
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline  w-full mt-4"
                    >
                    Submit Scores
                </button>
            </div>
                    </form>
        </div>
    );
};

export default FeedbackBallotPage;
