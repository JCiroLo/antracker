import React from "react";
import { DialogContext } from "@/providers/dialog-provider";

const useDialog = () => {
  return React.useContext(DialogContext);
};

export default useDialog;
