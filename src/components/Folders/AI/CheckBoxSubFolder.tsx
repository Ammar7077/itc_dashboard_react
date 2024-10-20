import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FOLDER, MAIN } from '../../types/folder';
import { useDispatch, useSelector } from 'react-redux';
import { getMainFolder, getSubFolder, getSubFolders, getSubSubfolders } from '../../redux/AI/aisSlice';
import axios from 'axios';



interface RootState {
    consulting: {
        subFolder: MAIN[];
    };
}

const CheckBoxSubFolder: React.FC = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    
    const { subFolder } = useSelector((state: RootState) => ({
        subFolder: state.consulting.subFolder,
    }));

    console.log("subFolder",subFolder);

    const subFolderId = subFolder.length > 0 ? subFolder[0].id : 'loading...';

    
    console.log("subFolder",subFolderId);

    const [selectedFolder, setSelectedFolder] = useState<{ id: string; name: string } | null>(null);
    const dispatch = useDispatch();

    // ------ get SubFolders --
    const fetchSubFolders = async () => {
        try {
            const result = await axios.post<{ data: FOLDER[] }>(`http://79.134.138.252:7111/ais/filter`, {
                parent_id: subFolder,
            });
            console.log("API Response:", result.data); 
            if (result.data) {
                dispatch(getSubSubfolders(result.data)); 
            } else {
                console.warn("No subfolders found");
                dispatch(getSubFolders([])); 
            }
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };

    useEffect(() => {
        if (subFolder) {
            fetchSubFolders();
        }

        const savedFolder = localStorage.getItem('selectedFolder');
        if (savedFolder) {
            try {
                const folderDetails = JSON.parse(savedFolder);
                setSelectedFolder(folderDetails);   
                dispatch(getMainFolder(folderDetails));  
            } catch (error) {
                console.error('Error parsing saved folder data:', error);
            }
        }
    }, [subFolder, dispatch]);

    const handleFolderClick = (folder: FOLDER) => {
        const subfolderDetails = { id: folder._id, name: folder.name };
        setSelectedFolder(subfolderDetails);
        localStorage.setItem('selectedSubFolder', JSON.stringify(subfolderDetails));  
    };
  return (
    <>
   { 
    <div>
      <label
        htmlFor="checkboxLabelOne"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelOne"
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked && 'border-primary bg-gray dark:bg-transparent'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'}`}
            ></span>
          </div>
        </div>
        Checkbox Text
      </label>
    </div>}
    </>
  )
}

export default CheckBoxSubFolder