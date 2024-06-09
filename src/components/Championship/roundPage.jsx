import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoundData, createMatch } from "../../services/ChampionshipService"; // replace with the actual path to your API functions
import TeamService from "../../services/TeamService";
import AdjudicatorService from "../../services/AdjudicatorService";
import Menu from "../menu";
import emailjs from "emailjs-com";
import { Link } from "react-router-dom";
const RoundPage = () => {
    const { id, roundNumber } = useParams();
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [govTeam, setGovTeam] = useState("");
    const [oppTeam, setOppTeam] = useState("");
    const [adjudicators, setAdjudicator] = useState([]);
    const [topic, setTopic] = useState("");
    const [motion, setMotion] = useState(null);

    useEffect(() => {
        TeamService.getTeams()
            .then((allTeams) => {
                setTeams(allTeams.teams);
            })
            .catch((error) => {
                console.error(error);
                setTeams([]); // Set teams to an empty array in case of an error
            });

        AdjudicatorService.getAdjudicators()
            .then((allAdjudicators) => {
                setAdjudicator(allAdjudicators.adjudicators);
            })
            .catch((error) => {
                console.error(error);
                setAdjudicator([]); // Set adjudicators to an empty array in case of an error
            });
        getRoundData(id, roundNumber)
            .then((data) => {
                setMatches(data);
            })
            .catch((error) => {
                console.error(error);
                setMatches([]); // Set matches to an empty array in case of an error
            });
    }, [id, roundNumber]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newMatch = await createMatch({
                championshipId: id,
                roundNumber,
                govTeam,
                oppTeam,
            });
            setMatches((prevMatches) => [...prevMatches, newMatch]);
            setGovTeam("");
            setOppTeam("");
        } catch (error) {
            console.error("Failed to create match:", error);
        }
    };

    const sendEmails = () => {
        matches.forEach((match) => {
            const adjudicator = adjudicators.find(
                (adjudicator) => adjudicator.id === match.adjudicatorId
            );

            emailjs
                .send(
                    "service_hrayy2r",
                    "template_b097iqo",
                    {
                        to_name: adjudicator.name,
                        to_email: adjudicator.email,
                        message: `Aici este ballot-ul de feedback pentru meciul pe care tocmai
                             l-ai arbitrat: http://localhost:3000/feedback-ballot/${match.id}`,
                    },
                    "mB3PJrXTmOmxHEP_K"
                )
                .then(
                    (response) => {
                        console.log("SUCCESS!", response.status, response.text);
                    },
                    (err) => {
                        console.log("FAILED...", err);
                    }
                );
        });
    };
    const generateAndDisplayMotion = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/motions/generate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ topic }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const motion = await response.json();
            setMotion(motion);
            // Display the motion
            console.log(motion);
        } catch (error) {
            console.error("Failed to generate motion:", error);
        }
    };
    return (
        <div class="relative overflow-x-auto shadow-md ">
            <Menu />
            <div className="container mx-auto px-4 py-8">
                <h1 className="flex justify-center text-xl font-bold my-4">
                    Round {roundNumber}
                </h1>
                <button
                    onClick={sendEmails}
                    class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Send Emails
                </button>
                <h1 className="text-xl font-bold my-4">Alege un topic pentru moțiune</h1>
                <select
                    className="block w-full px-4 py-2 mb-4 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setTopic(e.target.value)}
                >
                    <option value="">Alege un topic</option>
                    <option value="Tehnologie">Tehnologie</option>
                    <option value="Drepturile omului">Drepturile omului</option>
                    <option value="Politică">Politică</option>
                    <option value="Relațiile externe ale României">Relațiile externe ale României</option>
                </select>
                <button
                    onClick={generateAndDisplayMotion}
                    class="bg-gray-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                >
                    Generează o moțiune
                </button>

                <div className="motion-display my-4">
                    {motion && (
                        <div className="p-4 bg-gray-100 rounded">
                            <h2 className="font-bold">Moțiune:</h2>
                            <p>{motion.details}</p>{" "}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matches.map((match, i) => {
                        const govTeam = teams.find(
                            (team) => team.id === match.governmentTeamId
                        );
                        const oppTeam = teams.find(
                            (team) => team.id === match.oppositionTeamId
                        );
                        const adjudicator = adjudicators.find(
                            (adjudicator) =>
                                adjudicator.id === match.adjudicatorId
                        );

                        return (
                            <Link to={"/feedback-ballot/" + match.id} key={i}>
                                <div
                                    key={i}
                                    className="rounded-lg shadow-md bg-white overflow-hidden"
                                >
                                    <div className="px-6 py-4">
                                        <h2 className="font-bold text-xl mb-2">
                                            Match {i + 1}
                                        </h2>
                                        <p className="text-gray-700 text-base">
                                            Government:{" "}
                                            {govTeam
                                                ? govTeam.name
                                                : "Loading..."}
                                        </p>
                                        <p className="text-gray-700 text-base">
                                            Opposition:{" "}
                                            {oppTeam
                                                ? oppTeam.name
                                                : "Loading..."}
                                        </p>
                                        <p className="text-gray-700 text-base">
                                            Adjudicator:{" "}
                                            {adjudicator
                                                ? adjudicator.name
                                                : "Loading..."}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RoundPage;
