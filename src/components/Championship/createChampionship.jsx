import React, { useState, useEffect } from "react";
import { createChampionship } from "../../services/ChampionshipService";
import TeamService from "../../services/TeamService";
import { useNavigate} from "react-router-dom"
import Menu from "../menu";
const CreateChampionship = () => {
    const [name, setName] = useState("");
    const [rounds, setRounds] = useState(1);
    const [teams, setTeams] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        TeamService.getTeams()
            .then((response) => {
                setTeams(response.teams);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createChampionship({ name, rounds, teams });
            navigate("/championships")
        } catch (error) {
            // handle error
        }
    };

    return (
        <div class="relative overflow-x-auto shadow-md ">
            <Menu />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">
                    Create Championship
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label className="text-lg font-medium">
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="rounded-md border border-gray-400 px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </label>
                    <label className="text-lg font-medium">
                        Rounds:
                        <input
                            type="number"
                            value={rounds}
                            onChange={(e) => setRounds(e.target.value)}
                            className="rounded-md border border-gray-400 px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-gray-700 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                    >
                        Create Championship
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateChampionship;
