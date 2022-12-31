import { Typography, Grid } from "@mui/material";

function LastPage() {
  return (
    <Grid
      container
      width="100%"
      justifyContent="center"
      alignItems="center"
      maxWidth="700px"
    >
      <Grid container direction="column" alignItems="center">
        <Typography textAlign="center" fontSize={{ xs: "19px", sm: "25pt" }}>
          Thanks for submitting your information!
          <br /> A recruiter will be in touch with you within 24 hours :)
        </Typography>
        <Typography
          marginTop="20px"
          color="gray"
          fontSize={{ xs: "15px", sm: "15pt" }}
          fontFamily="sans-serif"
        >
          Please email us at{" "}
          <a href="mailto:josh@heytutor.com">tutorsupport@heytutor.com</a> for
          help
        </Typography>
      </Grid>
    </Grid>
  );
}

export default LastPage;
