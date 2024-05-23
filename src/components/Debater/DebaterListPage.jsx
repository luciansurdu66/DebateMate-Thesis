import React, { useEffect, useState } from 'react';
import DebaterService from '../../services/DebaterService';
import "../../index.scss";
import Menu from "../../components/menu";
const DebaterListPage = () => {
  const [debaters, setDebaters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDebaters();
  }, []);

  const fetchDebaters = async () => {
    const debatersData = (await DebaterService.getDebaters()).debaters;
    console.log(debatersData);
    if (Array.isArray(debatersData)) {
      setDebaters(debatersData);
    } else {
      console.error('DebaterService.getDebaters() did not return an array');
      setDebaters([]); // Set debaters to an empty array as a fallback
    }
  };

  return (
    <div class="relative overflow-x-auto shadow-md ">
    <Menu />
      <div class="pt-2 pb-3 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1 flex justify-center"> {/* or justify-end for right alignment */}
          <div class="flex items-center">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <input type="text" id="table-search" onChange={e => setSearchTerm(e.target.value)} class="block ps-10 h-8 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for a debater"/>
          </div>
        </div>
    </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 hide-scrollbar">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">ID</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Team</th>
            <th scope="col" className="px-6 py-3">Club</th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800"></th>
          </tr>
        </thead>
        <tbody>
        {debaters.filter(debater => 
            debater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            debater.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
            debater.club.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(debater => (
            <tr key={debater.id} className="border-b border-gray-200 dark:border-gray-700">
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">{debater.id}</td>
              <td className="px-6 py-4">{debater.name}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{debater.team}</td>
              <td className="px-6 py-4">{debater.club}</td>
              <td className="px-6 py-6 bg-gray-50 dark:bg-gray-800">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebaterListPage;
