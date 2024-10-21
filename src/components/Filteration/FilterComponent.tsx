import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (filterBody: Record<string, any>) => void;
  onApplyFilter: () => void;
}

const FilterComponent: React.FC<FilterProps> = ({ onFilterChange, onApplyFilter }) => {
  const [filterBody, setFilterBody] = useState<Record<string, any>>({});

  const handleInputChange = (key: string, value: any) => {
    const updatedFilterBody = { ...filterBody, [key]: value };
    setFilterBody(updatedFilterBody);
    onFilterChange(updatedFilterBody); // Pass updated filter values to parent
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">File/Folder Name</label>
        <input
          onChange={(e) => handleInputChange('name', e.target.value)}
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">File Type</label>
        <select
          onChange={(e) => handleInputChange('extension', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Select file type</option>
          <option value=".txt">.txt</option>
          <option value=".pdf">.pdf</option>
          <option value=".docx">.docx</option>
          <option value=".jpg">.jpg</option>
          <option value=".jsonl">.jsonl</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Size (bytes)</label>
          <input
            onChange={(e) => handleInputChange('min_size', +e.target.value)}
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Size (bytes)</label>
          <input
            onChange={(e) => handleInputChange('max_size', +e.target.value)}
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onApplyFilter}
          className="w-50 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
