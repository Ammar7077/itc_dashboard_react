import React, { useEffect, useRef, useState } from "react";
import { SizeTypeEnum } from "../../enums/SizeType.enum";

interface FilterProps {
  onFilterChange: (filterBody: Record<string, any>) => void;
  onApplyFilter: () => void;
}

const FilterComponent: React.FC<FilterProps> = ({
  onFilterChange,
  onApplyFilter,
}) => {
  const [filterBody, setFilterBody] = useState<Record<string, any>>({});
  const [isDropDownSizeClicked, setIsDropDownSizeClicked] = useState(false);
  const [selectedSizeTypeIndex, setSelectedSizeTypeIndex] = useState(2);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sizeTypeList = [
    SizeTypeEnum.BYTES,
    SizeTypeEnum.KB,
    SizeTypeEnum.MB,
    SizeTypeEnum.GB,
  ];

  const handleInputChange = (key: string, value: any) => {
    const updatedFilterBody = {
      ...filterBody,
      size_type: sizeTypeList[selectedSizeTypeIndex],
      [key]: value,
    };
    setFilterBody(updatedFilterBody);
    onFilterChange(updatedFilterBody);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropDownSizeClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          File/Folder Name
        </label>
        <input
          onChange={(e) => handleInputChange("name", e.target.value)}
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          File Type
        </label>
        <select
          onChange={(e) => handleInputChange("extension", e.target.value)}
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Min Size ({sizeTypeList[selectedSizeTypeIndex]})
          </label>
          <input
            onChange={(e) => handleInputChange("min_size", +e.target.value)}
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Size ({sizeTypeList[selectedSizeTypeIndex]})
          </label>
          <input
            onChange={(e) => handleInputChange("max_size", +e.target.value)}
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="relative inline-block text-left pt-6" ref={dropdownRef}>
          <button
            type="button"
            className="inline-flex w-20 h-10 justify-center gap-x-1 rounded-md bg-white py-2 text-sm font-semibold text-gray-900 ring-1 ring-black hover:bg-gray"
            onClick={() => setIsDropDownSizeClicked(!isDropDownSizeClicked)}
          >
            Size in
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>
          {isDropDownSizeClicked ? (
            <div className="absolute z-10 mt-2 w-20 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              {sizeTypeList.map((sizeType, index) => (
                <button
                  key={sizeType}
                  onClick={() => {
                    setSelectedSizeTypeIndex(index);
                    setIsDropDownSizeClicked(!isDropDownSizeClicked);
                  }}
                  className={`w-full block px-4 py-2 text-sm bg-${
                    selectedSizeTypeIndex === index ? "gray" : ""
                  } hover:bg-gray`}
                >
                  {sizeType}
                </button>
              ))}
            </div>
          ) : (
            <></>
          )}
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
