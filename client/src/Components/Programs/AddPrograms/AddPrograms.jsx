import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProgram } from '../../../redux/programSlice.js';

const AddProgram = () => {
  const dispatch = useDispatch();
  const { loading, error, program } = useSelector((state) => state.program);

  const [formData, setFormData] = useState({
    title: '', 
    description: '', 
    company: '', 
    visibility: 'public', 
    Type: 'bug-bounty', 
    bountyRange: {
      informational: 0,
      low: 50,
      medium: 400,
      high: 800,
      critical: 1000,
    },
    assets: [], 
    invitedHackers: []
  });

  const handleChange = (e) => {
    if (e.target.name.includes('bountyRange')) {
      setFormData({
        ...formData,
        bountyRange: {
          ...formData.bountyRange,
          [e.target.name.split('.')[1]]: e.target.value,
        },
      });
    } else {
      setFormData({...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProgram(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input name="title" onChange={handleChange} value={formData.title} placeholder="Program Title" className="border p-2 w-full" />
      <textarea name="description" onChange={handleChange} value={formData.description} placeholder="Description" className="border p-2 w-full" />
      
      <input name="company" onChange={handleChange} value={formData.company} placeholder="Company ID" className="border p-2 w-full" />
      
      <select name="visibility" onChange={handleChange} value={formData.visibility} className="border p-2 w-full">
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>

      <select name="Type" onChange={handleChange} value={formData.Type} className="border p-2 w-full">
        <option value="bug-bounty">Bug Bounty</option>
        <option value="VDP">VDP</option>
        <option value="private">Private</option>
      </select>

      <div>
        <label>Bounty Range</label>
        <input type="number" name="bountyRange.informational" onChange={handleChange} value={formData.bountyRange.informational} />
        <input type="number" name="bountyRange.low" onChange={handleChange} value={formData.bountyRange.low} />
        <input type="number" name="bountyRange.medium" onChange={handleChange} value={formData.bountyRange.medium} />
        <input type="number" name="bountyRange.high" onChange={handleChange} value={formData.bountyRange.high} />
        <input type="number" name="bountyRange.critical" onChange={handleChange} value={formData.bountyRange.critical} />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Create Program</button>
      {loading && <p>Creating program...</p>}
      {error && <p className="text-red-500">{error.message}</p>}
      {program && <p className="text-green-600">Program created successfully!</p>}
    </form>
  );
};

export default AddProgram;
