import React, { useState } from 'react';
import DebaterService from '../../services/DebaterService';
import Menu from '../menu';
const DebaterImportPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [debater, setDebater] = useState({ name: '', school: '' });
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const result = await DebaterService.importDebaters(selectedFile);

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }

    
  };

  const handleInputChange = (e) => {
    setDebater({ ...debater, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the API to create a debater
  };
  return (
    <div >
      <Menu/>
      <div className='flex'>
      <div className="w-1/2 p-4">
        <h2 className="text-2xl mb-4">Import Debaters</h2>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded">Upload</button>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-2xl mb-4">Create Debater</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Name</label>
          <input type="text" name="name" value={debater.name} onChange={handleInputChange} className="mb-4 w-full px-3 py-2 border rounded" />
          <label className="block mb-2">School</label>
          <input type="text" name="school" value={debater.school} onChange={handleInputChange} className="mb-4 w-full px-3 py-2 border rounded" />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default DebaterImportPage;
