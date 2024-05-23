import axios from 'axios'

const TeamService = {
    getTeams: async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/teams')
            return { success: true, teams: response.data }
        } catch (error) {
            console.error(error)
            return { success: false, teams: [] }
        }
    },
    getTeam: async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/teams/${id}`)
            return { success: true, team: response.data }
        } catch (error) {
            console.error(error)
            return { success: false, team: {} }
        }
    },
    createTeam: async (team) => {
        try {
            const response = await axios.post('http://localhost:5000/api/teams', team)
            return { success: true, team: response.data }
        } catch (error) {
            console.error(error)
            return { success: false, team: {} }
        }
    },
    updateTeam: async (id, team) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/teams/${id}`, team)
            return { success: true, team: response.data }
        } catch (error) {
            console.error(error)
            return { success: false, team: {} }
        }
    },
    deleteTeam: async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/teams/${id}`)
            return { success: true }
        } catch (error) {
            console.error(error)
            return { success: false }
        }
    }
}

export default TeamService