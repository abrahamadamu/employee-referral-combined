import { ReactNode } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

export default function QuestionBox({
  children,
  question,
  subQuestion,
  className,
  index,
}: {
  children: ReactNode;
  question: ReactNode;
  subQuestion?: ReactNode;
  className: string | undefined;
  index: number;
}) {
  return (
    <Grid
      container
      direction="column"
      sx={{
        gridRow: "1",
        gridColumn: "1",
        width: "720px",
        maxWidth: { xs: "95vw", sm: "90vw" },
      }}
      className={className ?? ""}
    >
      <Grid container direction="row" alignItems="start" wrap="nowrap" gap={1}>
        <Grid
          container
          direction="row"
          width="max-content"
          wrap="nowrap"
          alignItems="center"
          gap={0.5}
        >
          <Typography color="secondary">{index + 1}</Typography>
          <ArrowForward sx={{ fontSize: "15px" }} color="secondary" />
        </Grid>
        <Grid container direction="column">
          <Box marginBottom="30px">
            <Typography
              fontSize={{ sm: "24px", xs: "20px" }}
              marginBottom="10px"
            >
              {question}
            </Typography>
            {subQuestion && (
              <Typography
                fontSize={{ xs: "16px", sm: "20px" }}
                color="#000000B3"
              >
                {subQuestion}
              </Typography>
            )}
          </Box>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}
