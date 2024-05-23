import axios from 'axios';

const DebaterService = {
  importDebaters: async (file) => {
    try {
      console.log(file instanceof File); // should be true
    console.log(file instanceof Blob); // should be true
      const formData = new FormData();
      formData.append('file', file);
      console.log(file.name);
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }
      await axios.post('http://localhost:5000/api/debaters/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return { success: true, message: 'Debaters imported successfully service' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Failed to import debaters service' };
    }
  },

  getDebaters: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/debaters');
      console.log(response.data);
      return { success: true, debaters: response.data };
    } catch (error) {
      console.error(error);
      return { success: false, debaters: [] };
    }
  }
};

export default DebaterService;
