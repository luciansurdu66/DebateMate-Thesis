import axios from 'axios';

const AdjudicatorService = {
    importAdjudicators: async (file) => {
        try {
          console.log(file instanceof File); // should be true
          const formData = new FormData();
          formData.append('file', file);
          console.log(file.name);
          for (let pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
          }
          await axios.post('http://localhost:5000/api/adjudicators/import', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          return { success: true, message: 'Adjudicators imported successfully service' };
        } catch (error) {
          console.error(error);
          return { success: false, message: 'Failed to import Adjudicators service' };
        }
      },

    }

export default AdjudicatorService;