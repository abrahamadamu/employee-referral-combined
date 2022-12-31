import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import NavBar from "Components/NavBar";
import FormWindow from "./FormWindow";

const bgWidth = 600;
const FullContainer = styled(Grid)(({ theme }) => ({
  minHeight: "100vh",
  backgroundImage: `url("/images/bgpattern.svg")`,
  backgroundSize: `${Math.round(bgWidth * 0.931)}px ${bgWidth}px `,
}));

function GenerateLink() {
  return (
    <FullContainer justifyContent="center">
      <NavBar border />
      <FormWindow />
    </FullContainer>
  );
}

export default GenerateLink;
