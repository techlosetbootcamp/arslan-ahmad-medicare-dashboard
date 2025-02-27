import React from "react";
import QuickIcon from "../navbar/QuickIcon";
import { IoClose } from "react-icons/io5";

type ModelInterfaceProps = {
  title: string;
  open: boolean;
  setOpen: (val: boolean) => void;
  children: React.ReactNode;
};

const ModelInterface: React.FC<ModelInterfaceProps> = ({
  title,
  open,
  setOpen,
  children,
}) => {
  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white w-md rounded-md shadow-lg">
          <div className="flex justify-between p-3 bg-primary text-white">
            <p>{title}</p>
            <QuickIcon icon={<IoClose />} handleClick={() => setOpen(false)} />
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default ModelInterface;
