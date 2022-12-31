import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { referralContext } from "Contexts/contexts";

import styles from "./styles.module.scss";
import NavBar from "Components/NavBar";

import Intro from "./Sections/Intro";
import Benefits from "./Sections/Benefits";
import How from "./Sections/How";
import Jobs from "./Sections/Jobs";
import Footer from "./Sections/Footer";

function Signup() {
  const { URL_referral } = useParams();

  const { set: setReferralURL } = useContext(referralContext);

  useEffect(() => {
    document.title = "Lausd Tutor SignUp";
  }, []);

  useEffect(() => {
    setReferralURL({
      url: "/signup/form/" + (URL_referral ?? ""),
      id: URL_referral ?? "",
    });
  }, [URL_referral]);

  return (
    <div className={styles.Signup}>
      <NavBar />
      <div className={styles.content}>
        <Intro />
        <Benefits />
        <How />
        <Jobs />
        <Footer />
      </div>
    </div>
  );
}
export default Signup;
