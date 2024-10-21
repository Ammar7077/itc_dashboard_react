import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FOLDER } from '../../../types/folder';
import { useDispatch } from 'react-redux';
import { getMainFolder } from '../../../redux/Consultings/ConsultingsSlice';
import { StaticFolderSvg } from '../../Static/folder.svg';

interface FolderProps {
    folders: FOLDER[];
    title: string;
}

const Folder: React.FC<FolderProps> = ({ folders, title }) => {
    const [selectedFolder, setSelectedFolder] = useState<{ id: string; name: string } | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Load saved folder from localStorage on component mount
    useEffect(() => {
        const savedFolder = localStorage.getItem('selectedConsultingsFolder');
        if (savedFolder) {
            try {
                const folderDetails = JSON.parse(savedFolder);
                setSelectedFolder(folderDetails);
                dispatch(getMainFolder(folderDetails));
            } catch (error) {
                console.error('Error parsing saved folder data:', error);
            }
        }
    }, [dispatch]);

    // Function to handle folder click and store the selected folder details
    const handleFolderClick = (folder: FOLDER) => {
        const folderDetails = { id: folder._id, name: folder.name };

        // Set the selected folder in local state
        setSelectedFolder(folderDetails);
        // Dispatch action to update Redux state
        dispatch(getMainFolder(folderDetails));
        // Save to localStorage
        localStorage.setItem('selectedConsultingsFolder', JSON.stringify(folderDetails));

        // Navigate to the subfolder view
        navigate(`/consulting/${folder._id}`); // Ensure this route exists
    };

    return (
        <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">


            <div className="p-4 md:p-6 xl:p-9">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {folders.map((folder) => (
                        <Link
                            key={folder._id}
                            to="#"
                            onClick={() => handleFolderClick(folder)}
                            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${selectedFolder?.id === folder._id
                                    ? 'bg-slate-900 text-white border-transparent'
                                    : 'border-amber text-amber hover:bg-neutral-300 hover:border-white hover:text-black'
                                }`}
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-lg">
                                    {folder.name}
                                </span>
                                <div className='flex flex-1 gap-2'>
                                    <span className='mt-1 text-amber-500 dark:text-white'>
                                        {folder.total_files?.toLocaleString()} Files
                                    </span>
                                    <span className='mt-1 text-green-500 dark:text-white'>
                                        {folder.total_folders?.toLocaleString()} Folders
                                    </span>
                                </div>
                            </div>
                            <span className="ml-4 flex-shrink-0">
                                {StaticFolderSvg}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Folder;
