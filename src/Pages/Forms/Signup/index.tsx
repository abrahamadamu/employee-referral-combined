import { useState } from "react";
import { Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import FirstPage from "./FirstPage";
import Form from "./Form";
import LastPage from "./LastPage";

const FullContainer = styled(Grid)(() => ({
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "hidden",
}));

function Signup() {
  const [stage, setStage] = useState(0);

  return (
    <FullContainer container>
      <Box sx={{ position: "absolute", top: "30px", left: "20px" }}>
        <img
          src="/images/logo.svg"
          alt="heytutor logo"
          style={{ width: "120px" }}
        />
      </Box>
      {(() => {
        if (stage == 0)
          return <FirstPage stage={{ get: stage, set: setStage }} />;
        else if (stage == 1)
          return <Form stage={{ set: setStage, get: stage }} />;
        else return <LastPage />;
      })()}
    </FullContainer>
  );
}

export default Signup;
