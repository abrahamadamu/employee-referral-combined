import { useState } from "react";
import { Typography, Alert, Collapse, Grid } from "@mui/material";
import { LinkBox } from "./components";
import { ContentCopy } from "@mui/icons-material";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import styles from "./styles.module.scss";

function ShowLink({ link }: { link: string }) {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <Grid
        container
        alignItems="center"
        direction="column"
        wrap="nowrap"
        gap={4}
      >
        <Typography variant="h5">You can share this now!</Typography>
        <LinkBox
          marginTop="20px"
          container
          direction="row"
          gap={2}
          onClick={() => {
            navigator.clipboard.writeText(link);
            if (!showAlert) {
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 3000);
            }
          }}
        >
          <Typography textAlign="center">{link}</Typography>
          <ContentCopy sx={{ cursor: "pointer" }} />
        </LinkBox>
        <Grid container justifyContent="center" gap={2}>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
            target="_blank"
            rel="noopener"
          >
            <FaFacebook className={styles.socialIcon} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${link}`}
            target="_blank"
            rel="noopener"
          >
            <FaTwitter className={styles.socialIcon} />
          </a>
          <a
            href={`http://www.linkedin.com/shareArticle?mini=true&url=${link}`}
            target="_blank"
            rel="noopener"
          >
            <FaLinkedin className={styles.socialIcon} />
          </a>
          <a href={`mailto:?body=${link}`} target="_blank" rel="noopener">
            <FiMail className={styles.socialIcon} />
          </a>
        </Grid>
      </Grid>
      <Collapse sx={{ position: "absolute", bottom: "30px" }} in={showAlert}>
        <Alert>Copied</Alert>
      </Collapse>
    </>
  );
}

export default ShowLink;
