import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { Window, Content } from "./components";
import styles from "./styles.module.scss";

import TextSlide from "./TextSlide";
import Form from "./Form";
import ShowLink from "./ShowLink";
import { GpsFixedSharp } from "@mui/icons-material";

function FormWindow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [link, setLink] = useState<string | undefined>("");

  const slideItems = [
    {
      title: "Earn $100 for each tutor you refer!",
      text: "Get started in just a few clicks - simply generate a custom job link to spread to your network. There is no limit to how many tutors you can refer! To participate, you must be an active tutor with us.",
    },
    {
      title: "Generate your personalized job link",
      text: "We'll provide you with a custom job link that is used to track your referrals. As long as the tutor you referred is hired and works for at least two weeks, you get paid!",
    },
    {
      title: "Share your job link, and ca-ching!",
      text: "Share your job link with your fellow classmates, friends, and family. Nearly 15% of tutors that view our job posts apply to tutor with us. If you recruit 10 tutors from your network, thats $1,000!",
    },
  ];

  const gifs = ["/images/money.gif", "/images/reffer.gif", "/images/share.gif"];

  useEffect(() => {
    gifs.forEach((gif) => {
      new Image().src = gif;
    });
  }, []);

  return (
    <Window>
      <Content wrap="nowrap" container alignItems="center" direction="column">
        {currentSlide < gifs.length && (
          <Box key={gifs[currentSlide % gifs.length]}>
            <img
              src={gifs[currentSlide % gifs.length]}
              className={styles.anim}
            />
          </Box>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
          }}
        >
          {currentSlide < slideItems.length ? (
            slideItems.map((slide, i) => (
              <TextSlide
                key={slide.text}
                index={i}
                title={slide.title}
                text={slide.text}
                currentSlide={{ set: setCurrentSlide, get: currentSlide }}
              />
            ))
          ) : (
            <Grid container justifyContent="center" alignItems="center">
              {!link ? (
                <Form link={{ get: link, set: setLink }} />
              ) : (
                <ShowLink {...{ link }} />
              )}
            </Grid>
          )}
        </Box>
      </Content>
    </Window>
  );
}

export default FormWindow;
