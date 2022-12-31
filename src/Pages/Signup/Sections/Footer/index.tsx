import styles from "./styles.module.scss";
import { useState, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ExpandMore, Search } from "@mui/icons-material";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { styled } from "@mui/material/styles";
import FindTutorModal from "../../FindTutorModal";
import subjectsList from "../../FindTutorModal/subjectsList";
import Button from "../Components/Button";
import { FiSearch } from "react-icons/fi";

export const Img = styled("img")(({ theme }) => ({
  marginLeft: "15px",
  height: "26px",
  width: "144px",
  // [theme.breakpoints.up("md")]: {
  //   marginLeft: "0",
  //   height: "29px",
  //   width: "144px",
  // },
}));

type FooterListType = { title: string; items: { name: string; url: string }[] };

//TODO Associate a dialog with the Tutoring jobs menu
const FooterData: FooterListType[] = [
  {
    title: "About HeyTutor",
    items: [
      { name: "About Us", url: "https://heytutor.com/about-us/" },
      { name: "Brochure", url: "https://heytutor.com/brochure/" },
      { name: "HelpCenter", url: "https://support.heytutor.com/hc/en-us" },
    ],
  },
  {
    title: "For Students",
    items: [
      { name: "Tutors near me", url: "minisignup" },
      { name: "FAQ", url: "https://heytutor.com/faq-tutor/" },
      { name: "Blog", url: "https://heytutor.com/resources/blog/" },
    ],
  },
  {
    title: "For tutors",
    items: [
      { name: "Tutoring Jobs", url: "https://heytutor.com/tutoring-jobs/" },
      { name: "FAQ", url: "https://heytutor.com/faq-tutor/" },
    ],
  },
  {
    title: "Math",
    items: [
      { name: "Math", url: "https://heytutor.com/tutors/math/" },
      { name: "Calculus", url: "https://heytutor.com/tutors/calculus/" },
      { name: "Geometry", url: "https://heytutor.com/tutors/geometry/" },
    ],
  },
  {
    title: "Science",
    items: [
      { name: "Chemistry", url: "https://heytutor.com/tutors/chemistry/" },
      { name: "Physics", url: "https://heytutor.com/tutors/physics/" },
      {
        name: "Organic",
        url: "https://heytutor.com/tutors/organic-chemistry/",
      },
    ],
  },
  {
    title: "Test Prep",
    items: [
      { name: "GRE", url: "https://heytutor.com/tutors/gre/" },
      { name: "LSAT", url: "https://heytutor.com/tutors/lsat/" },
      { name: "MCAT", url: "https://heytutor.com/tutors/mcat/" },
    ],
  },
  {
    title: "Professional",
    items: [
      { name: "Computer", url: "https://heytutor.com/tutors/computer/" },
      {
        name: "Microsoft Excel",
        url: "https://heytutor.com/tutors/microsoft-excel/",
      },
      { name: "Java", url: "https://heytutor.com/tutors/java/" },
    ],
  },
];

function Footer() {
  const [showLocation, setShowLocation] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const [searchSubject, setSearchSubject] = useState<string>();
  const latestSearchSubject = useRef<string | undefined>("");
  useEffect(() => {
    latestSearchSubject.current = searchSubject;
  }, [searchSubject]);

  return (
    <Grid
      container
      width="100%"
      className={styles.Footer}
      sx={{
        padding: "80px 0",
        borderRadius: { xs: "56px", md: "100px" },
        borderBottomLeftRadius: "0!important",
        borderBottomRightRadius: "0!important",
      }}
      direction="column"
      alignItems="center"
    >
      <Grid
        container
        direction="column"
        className={styles.content}
        sx={{ maxWidth: "1280px" }}
        padding="0 20px"
      >
        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          gap={3}
          wrap="nowrap"
          justifyContent="space-between"
          alignItems="center"
          className={styles.topRow}
          paddingBottom={{ xs: "15px", md: "50px" }}
        >
          <Img alt="logo" src="/images/logo.svg" />
          <Grid
            container
            direction="row"
            alignItems="center"
            width={{ xs: "100%", md: "max-content" }}
            justifyContent="space-between"
            className={styles.searchBar}
            gap={2}
          >
            <div className={styles.selectCnt}>
              <FiSearch className={styles.icon} color="#9663fc" />
              <Autocomplete
                className={styles.searchInput}
                value={searchSubject ? searchSubject : null}
                onChange={(_, v) => setSearchSubject(v ?? "")}
                options={subjectsList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Subject"
                  />
                )}
              />
            </div>
            <Button
              openReferral={false}
              onClick={() => setShowSignupForm(true)}
            >
              Find a tutor
            </Button>
          </Grid>
        </Grid>
        <hr className={styles.divider} />
        <Box
          className={styles.footerItemsCnt}
          sx={{ gridTemplateColumns: { md: "repeat(5, 1fr)", xs: "1fr" } }}
          justifyContent="space-between"
          padding="60px 0"
          gap={{ xs: 2, md: "unset" }}
        >
          <Grid
            container
            direction={{ md: "column", xs: "row" }}
            justifyContent={{ xs: "space-between", md: "unset" }}
            marginBottom={{ xs: "20px", md: "unset" }}
            gap={1.5}
          >
            <Typography fontSize="18px" fontWeight={600}>
              Follow us
            </Typography>
            <div>
              <div className={styles.iconsCnt}>
                <a
                  href="https://www.facebook.com/heytutor/"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <div className={styles.socialIcon}>
                    <FaFacebookF className={styles.icon} />
                  </div>
                </a>
                <a
                  href="https://twitter.com/heytutor"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <div className={styles.socialIcon}>
                    <FaTwitter className={styles.icon} />
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/heytutor/"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <div className={styles.socialIcon}>
                    <FaInstagram className={styles.icon} />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/company/heytutor/"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <div className={styles.socialIcon}>
                    <FaLinkedinIn className={styles.icon} />
                  </div>
                </a>
              </div>
              <a
                href="tel:855-702-1849"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography marginTop="15px">855-702-1849</Typography>
              </a>
            </div>
          </Grid>

          <FooterList data={FooterData[0]} />
          {(() => {
            const children = [];
            for (let i = 1; i < FooterData.length; i += 2) {
              children.push(
                <Grid
                  container
                  key={FooterData[i].title}
                  direction="column"
                  width={{ xs: "100%", sm: "max-content" }}
                  gap={{ md: "32px", xs: 2 }}
                >
                  <FooterList
                    data={FooterData[i]}
                    setShowSignupForm={setShowSignupForm}
                    setSearchSubject={setSearchSubject}
                    latestSearchSubject={latestSearchSubject}
                  />
                  <FooterList
                    data={FooterData[i + 1]}
                    setShowSignupForm={setShowSignupForm}
                    setSearchSubject={setSearchSubject}
                    latestSearchSubject={latestSearchSubject}
                  />
                </Grid>
              );
            }
            return children;
          })()}
          <Grid
            container
            width="max-content  "
            sx={{
              gridColumnEnd: "-1",
              paddingTop: "20px",
              paddingBottom: "10px",
              borderBottom: "2px solid",
              transition: "all 0.2s",
              "&:hover": {
                borderBottom: "3px solid #9663fc",
              },
            }}
          >
            <Typography
              sx={{ gridRowStart: 1 }}
              fontSize="18px"
              fontWeight="bold"
              className={styles.footerLink}
            >
              <a
                href="https://heytutor.com/sitemap/"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Browse all Subjects
              </a>
            </Typography>
          </Grid>
        </Box>
        <hr className={styles.divider} />

        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          justifyContent={{ xs: "center", md: "space-between" }}
          alignItems="center"
          marginTop="20px"
          className={styles.footerBottom}
        >
          <Box
            gap={2}
            className={styles.bottomItems}
            sx={{
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
            }}
            marginBottom={{ xs: "30px", md: "unset" }}
          >
            <a
              href="https://heytutor.com/terms/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Typography className={styles.footerLink} fontSize="14px">
                Terms of Use
              </Typography>
            </a>
            <a
              href="https://heytutor.com/privacy-policy/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Typography className={styles.footerLink} fontSize="14px">
                Privacy Policy
              </Typography>
            </a>
            {!showLocation && (
              <Typography
                className={styles.footerLink}
                fontSize="14px"
                onClick={(e) => setShowLocation(!showLocation)}
              >
                Center Locations
              </Typography>
            )}
            <a
              href="https://heytutor.com/tutor-bios-pdf/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Typography className={styles.footerLink} fontSize="14px">
                Tutor Examples
              </Typography>
            </a>
          </Box>
          <Typography fontSize="14px">
            © 2022 HeyTutor LLC - All Rights Reserved
          </Typography>
          {showLocation && (
            <Typography
              className={styles.footerLink}
              fontSize="14px"
              width="100%"
              textAlign="center"
              marginTop="30px"
              onClick={(e) => setShowLocation(!showLocation)}
            >
              12327 Santa Monica Blvd, #202, Los Angeles CA 90025, 9107 Wilshire
              Blvd, #450, Beverly Hills CA 90210, Figueroa at Wilshire, 601 S
              Figueroa St #4050, Los Angeles, CA 90017
            </Typography>
          )}
        </Grid>
      </Grid>
      {showSignupForm && (
        <FindTutorModal
          hideSignupForm={() => setShowSignupForm(false)}
          subject={latestSearchSubject.current}
        />
      )}
    </Grid>
  );
}

function FooterList({
  data,
  setShowSignupForm,
  setSearchSubject,
  latestSearchSubject,
}: {
  data: FooterListType;
  setShowSignupForm?: (v: boolean) => void;
  setSearchSubject?: (v: string | undefined) => void;
  latestSearchSubject?: { current: string | undefined };
}) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  const title = (
    <Typography
      className={styles.title}
      fontSize="18px"
      fontWeight="bold"
      lineHeight="24px"
      marginBottom="12px"
    >
      {data.title}
    </Typography>
  );

  const content = data.items.map((item) => (
    <Typography
      key={item.name}
      className={styles.footerLink}
      fontSize="16px"
      lineHeight="24px"
      marginBottom="7px"
    >
      {item.url === "minisignup" &&
      setShowSignupForm &&
      setSearchSubject &&
      latestSearchSubject ? (
        <div
          onClick={() => {
            setSearchSubject(undefined);
            latestSearchSubject.current = undefined;
            setShowSignupForm(true);
          }}
        >
          {item.name}
        </div>
      ) : (
        <a href={item.url} style={{ color: "inherit", textDecoration: "none" }}>
          {item.name}
        </a>
      )}
    </Typography>
  ));

  return sm ? (
    <Grid container className={styles.footerList} width="max-content">
      <div>
        {title}
        {content}
      </div>
    </Grid>
  ) : (
    <Accordion className={styles.footerListAccordion} sx={{ width: "100%" }}>
      <AccordionSummary className={styles.summary} expandIcon={<ExpandMore />}>
        {title}
      </AccordionSummary>
      <AccordionDetails className={styles.details}>{content}</AccordionDetails>
    </Accordion>
  );
}

export default Footer;
