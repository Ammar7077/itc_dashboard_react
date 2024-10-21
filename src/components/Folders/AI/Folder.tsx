import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FOLDER, MAIN } from '../../../types/folder';
import { useDispatch, useSelector } from 'react-redux';
import { getMainFolder } from '../../../redux/JSONLs/JSONLsSlice';
import { getFileInfo, getFiles, getfolderId } from '../../../redux/AI/aisSlice';
import axios from 'axios';
import { FILE } from '../../../types/file';
import { StaticFolderSvg } from '../../Static/folder.svg';

interface FolderProps {
    folders: FOLDER[];
    title: string;

}
interface StateProps {
    AI: {
        fileInfo: FILE;
        subFolder: MAIN;
        files: FILE[];
        fileId: string
    };
}


const Folder: React.FC<FolderProps> = ({ folders, title }) => {

    const [selectedFolder, setSelectedFolder] = useState<{ id: string; name: string } | null>(null);
    const dispatch = useDispatch();

    const { fileId } = useSelector((state: StateProps) => ({
        fileInfo: state.AI.fileInfo,
        subFolder: state.AI.subFolder,
        files: state.AI.files,
        fileId: state.AI.fileId,
    }));

    console.log("log", fileId);

    const fetchFiles = async () => {
        //setLoading(true);

        try {
            const result = await axios.post<{
                length: number; data: FILE[]
            }>(`http://79.134.138.252:7111/ais/filter`, {
                path: fileId
            });

            if (result.data && result.data.length > 0) {
                console.log("resusot jfbsd skabc as",result.data);
                
                dispatch(getFiles(result.data)); // Update Redux state with the new files
            }

        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    ///console.log("log sdsdds", fileId);
    


    // Load saved folder from localStorage on component mount
    useEffect(() => {
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
    }, [dispatch]);

    // Function to handle folder click and store the selected folder details
    const handleFolderClick = (folder: FOLDER) => {
        const folderDetails = { id: folder._id, name: folder.name };
        console.log("folderDetails", folderDetails);
        dispatch(getfolderId(folder._id))
        fetchFiles()
        setSelectedFolder(folderDetails);
        dispatch(getMainFolder(folderDetails));
        localStorage.setItem('selectedFolder', JSON.stringify(folderDetails));
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
