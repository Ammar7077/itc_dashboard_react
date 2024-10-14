import React, { useEffect,useState } from 'react';
import TableOne from '../../components/Tables/JSONLs/TablesFiles';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Folder from '../../components/Folders/JSONLs/Folder';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, getFolders } from '../../redux/JSONLs/JSONLsSlice';
import { FOLDER, MAIN } from '../../types/folder';
import SubFolder from '../../components/Folders/JSONLs/SubFolder';



interface RootState {
    JSONLs: {
        folders: FOLDER[];
        mainFolder:MAIN;
    };
}

const JSONLs: React.FC = () => {
    const [parentId, setParentId] = useState<string>("null");
    const dispatch = useDispatch();

    const { folders,mainFolder } = useSelector((state: RootState) => ({
        folders: state.JSONLs.folders,
        mainFolder:state.JSONLs.mainFolder
    }));

  const mainFolderName = mainFolder ? mainFolder.name : 'loading...';
  const mainFolderId = mainFolder ?mainFolder.id :'loading ...'

  console.log(mainFolder?.name);
  console.log(localStorage.getItem('selectedFolder'));
  console.log(mainFolderName);  

    //--------------get Folders ----
    const fetchFolders = async () => {
        try {
            const result = await axios.post<{ data: FOLDER[] }>(`http://localhost:3000/jsonls/filter`, {
                parent_id: parentId,
            });
            console.log("API Response:", result.data); // Log the entire response
            if (result.data) {
                dispatch(getFolders(result.data)); 
            } else {
                console.warn("No data found in API response");
            }
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };    

    // ---------------get files ----
    // may we add path side to Folder Name on the title to move on the second folders once click on it

    /* const fetchFiles = async ()=>{
        try{
            const result = await axios.get<{data:FILE[]}>()
        }
    } */

    useEffect(() => {
         fetchFolders();
    }, [dispatch,parentId]); 
        
    return (
        <>
            <Breadcrumb pageName='JSONLs' />
            <Folder folders={folders || []} title={"JSONLs's Folders"}  /> 
            <div className='grid grid-cols-1 gap-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mb-10'>
                
                {/* <InputText/> */}

                 {/* <!-- Checkbox and radio --> */}
             <div className="col-span-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                     <h3 className="font-medium text-black dark:text-white">
                     Subfolders on {mainFolderName}
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-2">
                <SubFolder mainFolderId={mainFolderId}/>
                </div>
             </div>

            </div>

            <div className="flex flex-col gap-10">
                <TableOne JSONLs={{
                    subFolder: {
                        id: '',
                        name: ''
                    },
                    files: []
                }} />
            </div> 
        </>
    );
}

export default JSONLs;
