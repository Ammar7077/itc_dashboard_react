import { FC } from "react";

interface PathComponentProps {
  folderName: string;
  onClick: () => void;
}

export const PathComponent: FC<PathComponentProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="justify-start text-blue-500 hover:text-blue-900"
    >
      {props.folderName}
    </button>
  );
};
