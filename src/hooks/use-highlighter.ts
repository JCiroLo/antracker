import React from "react";
import { HighlightContext } from "@/providers/highlight-provider";

const useHighlighter = () => {
  return React.useContext(HighlightContext);
};

export default useHighlighter;
