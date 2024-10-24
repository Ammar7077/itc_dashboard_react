import { FC } from "react";
import { StaticFolderSvg } from "./Static/folder.svg";
import { TFolder } from "../core/types/folder";

interface FolderComponentProps {
  folder: TFolder;
  onClick: () => void;
}

export const FolderComponent: FC<FolderComponentProps> = ({
  folder,
  onClick,
}) => {
  return (
    <button
      className="flex items-start p-4 rounded-lg border transition-all transform duration-300 ease-in-out flex-col"
      onClick={onClick}
    >
      {StaticFolderSvg}
      <span className="font-medium text-sm">{folder.name}</span>
      <div className="flex flex-2 gap-2">
        <span className="mt-1 text-amber-500 dark:text-white">
          Files: {folder.total_files}
        </span>
        <span className="mt-1 text-green-500 dark:text-white">
          Folders: {folder.total_folders}
        </span>
      </div>
    </button>
  );
};
