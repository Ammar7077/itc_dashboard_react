import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FOLDER } from '../../../types/folder';
import { useDispatch, useSelector } from 'react-redux';
import { getMainFolder, getSubFolder, getSubFolders } from '../../../redux/Consultings/ConsultingsSlice';
import axios from 'axios';
import Breadcrumb from './Breadcrumb'; // Import your breadcrumb component

interface FolderProps {
    mainFolderId: string;
}

interface RootState {
    Consultings: {
        subfolders: FOLDER[];
    };
}

const SubFolder: React.FC<FolderProps> = ({ mainFolderId }) => {

    // Redux 
    const { subfolders } = useSelector((state: RootState) => ({
        subfolders: state.Consultings.subfolders,
    }));

    console.log("mainFolderId consulting", mainFolderId);

    // useState for Breadcrumb "path" plus Selection icon
    const [selectedSubfolder, setSelectedSubfolder] = useState<{ id: string; name: string } | null>(null);
    const [breadcrumbPath, setBreadcrumbPath] = useState<{ id: string; name: string }[]>([]); 
    const dispatch = useDispatch();

    // ------ Fetch SubFolders ------ 
    const fetchSubFolders = async (folderId: string) => {
        try {
            const result = await axios.post<{ data: FOLDER[] }>(`http://79.134.138.252:7111/consultings/filter`, {
                parent_id: folderId,
            });
            console.log("result sub folders", result.data);

            if (result.data) {
                dispatch(getSubFolders(result.data));
            } else {
                dispatch(getSubFolders([]));
            }
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };

    // ------ Fetch on initial load and whenever selectedConsultingsFolder changes ------
    useEffect(() => {
        const savedFolder = localStorage.getItem('selectedConsultingsFolder');
        if (savedFolder) {
            const folderDetails = JSON.parse(savedFolder);
            setBreadcrumbPath([{ id: folderDetails.id, name: folderDetails.name }]);
            fetchSubFolders(mainFolderId); 
        }
    }, [mainFolderId, dispatch]);

    // ------ Fetch when localStorage.selectedConsultingsFolder changes ------
    useEffect(() => {
        const handleStorageChange = () => {
            const savedFolder = localStorage.getItem('selectedConsultingsFolder');
            if (savedFolder) {
                const folderDetails = JSON.parse(savedFolder);
                setBreadcrumbPath([{ id: folderDetails.id, name: folderDetails.name }]);
                fetchSubFolders(folderDetails.id); // Fetch based on the updated selected folder
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Once the subfolder is clicked
    const handleFolderClick = (folder: FOLDER) => {
        const subfolderDetails = { id: folder._id, name: folder.name };
        setSelectedSubfolder(subfolderDetails);
        setBreadcrumbPath(prev => [...prev, subfolderDetails]); 
        dispatch(getSubFolder(subfolderDetails));

        localStorage.setItem('selectedConsultingsSubFolder', JSON.stringify(subfolderDetails));

        fetchSubFolders(folder._id);
    };

    // Handle breadcrumb click to navigate to a previous folder and make it active
    const handleBreadcrumbClick = (clickedFolder: { id: string; name: string }) => {
        setSelectedSubfolder(clickedFolder); 

        const updatedPath = breadcrumbPath.slice(0, breadcrumbPath.findIndex(f => f.id === clickedFolder.id) + 1);
        setBreadcrumbPath(updatedPath);

        fetchSubFolders(clickedFolder.id);
    };

    return (
        <div>
            <Breadcrumb path={breadcrumbPath} onBreadcrumbClick={handleBreadcrumbClick} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {subfolders
                    .filter((folder) => folder.document_type === "folder")
                    .map((folder) => (
                        <Link
                            key={folder._id}
                            to="#"
                            onClick={() => handleFolderClick(folder)}
                            aria-label={`Open folder ${folder.name}`}
                            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                                selectedSubfolder?.id === folder._id
                                    ? 'bg-slate-900 text-white border-transparent'
                                    : 'border-amber text-amber hover:bg-neutral-300 hover:border-white hover:text-black'
                            }`}
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-sm">{folder.name}</span>
                                <div className='flex flex-2 gap-2'>
                                    <span className="mt-1 text-amber-500 dark:text-white">{folder.total_files.toLocaleString()} Files</span>
                                    <span className="mt-1 text-green-500 dark:text-white">{folder.total_folders.toLocaleString()} Folders</span>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default SubFolder;
