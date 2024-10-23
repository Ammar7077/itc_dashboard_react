import React, { useEffect, useState } from "react";
import CardDataFolder from "../../components/CardDataFolder";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChartOne from "../../components/Charts/ChartOne";

interface FolderStats {
  totalFiles: number;
  totalFolders: number;
  totalSizeGB: number; // Make sure this is a number
}

const DataBank: React.FC = () => {
  const [folderJsonlsStats, setFolderJsonlsStats] = useState<FolderStats>({
    totalFiles: 0,
    totalFolders: 0,
    totalSizeGB: 0,
  });
  const [folderAIStats, setFolderAIStats] = useState<FolderStats>({
    totalFiles: 0,
    totalFolders: 0,
    totalSizeGB: 0,
  });
  const [folderConsultingsStats, setFolderConsultingsStats] =
    useState<FolderStats>({
      totalFiles: 0,
      totalFolders: 0,
      totalSizeGB: 0,
    });
  const [folderMediaStats, setFolderMediaStats] = useState<FolderStats>({
    totalFiles: 0,
    totalFolders: 0,
    totalSizeGB: 0,
  });

  const navigate = useNavigate();

  // Fetch folder stats from API
  const fetchFolders = async (
    url: string,
    setStats: React.Dispatch<React.SetStateAction<FolderStats>>
  ) => {
    try {
      const result = await axios.post(url, {
        parent_id: "null",
        path: "ITC Databank",
      });
      console.log("API Response:", result.data);

      if (result.data) {
        // Initialize sums
        let totalFiles = 0;
        let totalFolders = 0;
        let totalSizeBytes = 0;

        // Iterate through the response array
        result.data.forEach(
          (folder: {
            total_files: number;
            total_folders: number;
            size: number;
          }) => {
            totalFiles += folder.total_files;
            totalFolders += folder.total_folders;
            totalSizeBytes += folder.size;
          }
        );

        const totalSizeGB = (totalSizeBytes / 1024 ** 3).toFixed(2); // Calculate size in GB

        // Set the state with the computed totals
        setStats({
          totalFiles,
          totalFolders,
          totalSizeGB,
        });
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolders(
      "http://79.134.138.252:7111/jsonls/filter",
      setFolderJsonlsStats
    );
    fetchFolders(
      "http://79.134.138.252:7111/consultings/filter",
      setFolderConsultingsStats
    );
    fetchFolders("http://79.134.138.252:7111/ais/filter", setFolderAIStats);
    fetchFolders(
      "http://79.134.138.252:7111/media/filter",
      setFolderMediaStats
    );
  }, []);

  const handleCardClick = (folderType: string) => {
    navigate(`/data/${folderType}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div onClick={() => handleCardClick("ai")} className="cursor-pointer">
          <CardDataFolder
            title="AI"
            Size={"6.562 TB "}
            NoOfFiles={"151,154"}
            levelUp
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="w-22 h-22"
              fill="none"
            >
              <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                <path
                  d="M0.625 76.898C0.232 76.35 0 75.678 0 74.952v-7.077V22.622c0-1.605 1.301-2.907 2.907-2.907h2.195c2.212 0 4.005-1.793 4.005-4.005V11.705c0-2.212 1.793-4.005 4.005-4.005h22.78c1.494 0 2.864 0.831 3.553 2.157l1.924 3.698c0.69 1.325 2.059 2.157 3.553 2.157h26.374c1.605 0 2.907 1.301 2.907 2.907v16.644L0.625 76.898z"
                  className="fill-yellow-600"
                />
                <path
                  d="M63.873 35.394v-6.925c0-2.116-1.715-3.831-3.831-3.831H11.11c-2.116 0-3.831 1.715-3.831 3.831v36.624L63.873 35.394z"
                  className="fill-yellow-200"
                />
                <path
                  d="M67.873 39.394v-6.925c0-2.116-1.715-3.831-3.831-3.831H15.11c-2.116 0-3.831 1.715-3.831 3.831v26.624L67.873 39.394z"
                  className="fill-white"
                />
                <path
                  d="M16.438 41.635c0.646-1.441 2.079-2.369 3.658-2.369H86.86c2.274 0 3.792 2.344 2.862 4.419l-14.23 31.735c-0.784 1.749-2.522 2.875-4.439 2.875H10.421H3.344c-1.121 0-2.112-0.551-2.719-1.397L8.75 58.781 16.438 41.635z"
                  className="fill-yellow-500"
                />
              </g>
            </svg>
          </CardDataFolder>
        </div>

        <div
          onClick={() => handleCardClick("consultings")}
          className="cursor-pointer"
        >
          <CardDataFolder
            title="Consulting"
            Size={`${folderConsultingsStats.totalSizeGB} GB`}
            NoOfFiles={folderConsultingsStats.totalFiles.toLocaleString()}
            levelUp
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="w-22 h-22"
              fill="none"
            >
              <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                <path
                  d="M0.625 76.898C0.232 76.35 0 75.678 0 74.952v-7.077V22.622c0-1.605 1.301-2.907 2.907-2.907h2.195c2.212 0 4.005-1.793 4.005-4.005V11.705c0-2.212 1.793-4.005 4.005-4.005h22.78c1.494 0 2.864 0.831 3.553 2.157l1.924 3.698c0.69 1.325 2.059 2.157 3.553 2.157h26.374c1.605 0 2.907 1.301 2.907 2.907v16.644L0.625 76.898z"
                  className="fill-sky-500"
                />
                <path
                  d="M63.873 35.394v-6.925c0-2.116-1.715-3.831-3.831-3.831H11.11c-2.116 0-3.831 1.715-3.831 3.831v36.624L63.873 35.394z"
                  className="fill-yellow-200"
                />
                <path
                  d="M67.873 39.394v-6.925c0-2.116-1.715-3.831-3.831-3.831H15.11c-2.116 0-3.831 1.715-3.831 3.831v26.624L67.873 39.394z"
                  className="fill-white"
                />
                <path
                  d="M16.438 41.635c0.646-1.441 2.079-2.369 3.658-2.369H86.86c2.274 0 3.792 2.344 2.862 4.419l-14.23 31.735c-0.784 1.749-2.522 2.875-4.439 2.875H10.421H3.344c-1.121 0-2.112-0.551-2.719-1.397L8.75 58.781 16.438 41.635z"
                  className="fill-sky-400"
                />
              </g>
            </svg>
          </CardDataFolder>
        </div>

        <div
          onClick={() => handleCardClick("media")}
          className="cursor-pointer"
        >
          <CardDataFolder
            title="Media"
            Size={`${folderMediaStats.totalSizeGB} GB`}
            NoOfFiles={folderMediaStats.totalFiles}
            levelDown
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="w-22 h-22"
              fill="none"
            >
              <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                <path
                  d="M0.625 76.898C0.232 76.35 0 75.678 0 74.952v-7.077V22.622c0-1.605 1.301-2.907 2.907-2.907h2.195c2.212 0 4.005-1.793 4.005-4.005v0c0-2.212 1.793-4.005 4.005-4.005h22.78c1.494 0 2.864 0.831 3.553 2.157l1.924 3.698c0.69 1.325 2.059 2.157 3.553 2.157h26.374c1.605 0 2.907 1.301 2.907 2.907v16.644L0.625 76.898z"
                  className="fill-yellow-500"
                />
                <path
                  d="M63.873 35.394v-6.925c0-2.116-1.715-3.831-3.831-3.831H11.11c-2.116 0-3.831 1.715-3.831 3.831v36.624L63.873 35.394z"
                  className="fill-yellow-200"
                />
                <path
                  d="M67.873 39.394v-6.925c0-2.116-1.715-3.831-3.831-3.831H15.11c-2.116 0-3.831 1.715-3.831 3.831v26.624L67.873 39.394z"
                  className="fill-white"
                />
                <path
                  d="M16.438 41.635c0.646-1.441 2.079-2.369 3.658-2.369H86.86c2.274 0 3.792 2.344 2.862 4.419l-14.23 31.735c-0.784 1.749-2.522 2.875-4.439 2.875H10.421H3.344c-1.121 0-2.112-0.551-2.719-1.397L8.75 58.781 16.438 41.635z"
                  className="fill-yellow-400"
                />
              </g>
            </svg>
          </CardDataFolder>
        </div>
        <div
          onClick={() => handleCardClick("JSONLs")}
          className="cursor-pointer"
        >
          <CardDataFolder
            title="JSONL"
            Size={folderJsonlsStats.totalSizeGB}
            NoOfFiles={folderJsonlsStats.totalFiles.toLocaleString()}
            levelUp
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="w-22 h-22"
              fill="none"
            >
              <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                <path
                  d="M0.625 76.898C0.232 76.35 0 75.678 0 74.952v-7.077V22.622c0-1.605 1.301-2.907 2.907-2.907h2.195c2.212 0 4.005-1.793 4.005-4.005V11.705c0-2.212 1.793-4.005 4.005-4.005h22.78c1.494 0 2.864 0.831 3.553 2.157l1.924 3.698c0.69 1.325 2.059 2.157 3.553 2.157h26.374c1.605 0 2.907 1.301 2.907 2.907v16.644L0.625 76.898z"
                  className="fill-blue-700"
                />
                <path
                  d="M63.873 35.394v-6.925c0-2.116-1.715-3.831-3.831-3.831H11.11c-2.116 0-3.831 1.715-3.831 3.831v36.624L63.873 35.394z"
                  className="fill-yellow-300"
                />
                <path
                  d="M67.873 39.394v-6.925c0-2.116-1.715-3.831-3.831-3.831H15.11c-2.116 0-3.831 1.715-3.831 3.831v26.624L67.873 39.394z"
                  className="fill-white"
                />
                <path
                  d="M16.438 41.635c0.646-1.441 2.079-2.369 3.658-2.369H86.86c2.274 0 3.792 2.344 2.862 4.419l-14.23 31.735c-0.784 1.749-2.522 2.875-4.439 2.875H10.421H3.344c-1.121 0-2.112-0.551-2.719-1.397L8.75 58.781 16.438 41.635z"
                  className="fill-indigo-700"
                />
              </g>
            </svg>
          </CardDataFolder>
        </div>
      </div>

      <ChartOne />
    </>
  );
};

export default DataBank;
