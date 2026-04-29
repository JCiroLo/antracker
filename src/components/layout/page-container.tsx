import React from "react";
import { Container } from "@mui/material";

type PageContainerProps = {
  children: React.ReactNode;
};

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        position: "relative",
        display: "flex",
        gap: 1,
        flexDirection: "column",
        justifyContent: "center",
        height: "100dvh",
        paddingX: 1,
        overflowY: "hidden",
      }}
    >
      {children}
    </Container>
  );
};

export default PageContainer;
