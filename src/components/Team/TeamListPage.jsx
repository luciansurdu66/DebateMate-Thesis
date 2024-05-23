import React, { useState, useEffect } from 'react';
import TeamService from '../../services/TeamService';

const TeamListPage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    TeamService.getTeams()
      .then(response => {
        setTeams(response.teams);
        console.log(response.teams);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {teams.map(teams => (
          <li key={teams.id}>{teams.name} {teams.debater1Id}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamListPage;