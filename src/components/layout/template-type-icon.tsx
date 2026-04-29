import React from "react";
import { Tooltip } from "@mui/material";
import ArrowUpIcon from "@/components/icons/arrow-up-icon";
import ArrowDownIcon from "@/components/icons/arrow-down-icon";
import type { TransactionType } from "@/types/transaction";

type TemplateTypeIconProps = {
  type: TransactionType;
  oneTime?: boolean;
  size?: number;
};

const TemplateTypeIcon: React.FC<TemplateTypeIconProps> = ({ type, size = 20 }) => {
  return (
    <Tooltip title={type === "expense" ? "Gasto" : "Ingreso"} placement="top" arrow>
      {type === "expense" ? (
        <ArrowDownIcon color="error" sx={{ fontSize: size, mr: 1 }} />
      ) : (
        <ArrowUpIcon color="success" sx={{ fontSize: size, mr: 1 }} />
      )}
    </Tooltip>
  );
};

export default TemplateTypeIcon;
