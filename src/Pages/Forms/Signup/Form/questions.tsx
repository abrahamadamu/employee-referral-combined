import { ReactNode } from "react";

const questions: {
  name: string;
  type: "text" | "choice" | "email" | "phone";
  question: string | ReactNode;
  subQuestion?: string | ReactNode;
  required: boolean;
  choices?: { text: string; type: "text" | "other" }[];
}[] = [
  {
    name: "fullname",
    type: "text",
    question: (
      <>
        Let's start with your <b>first and last name.*</b>
      </>
    ),
    required: true,
  },
  {
    name: "experiencek8",
    type: "text",
    question: "Have you had experience tutoring K-8 students?",
    subQuestion:
      "Please share any relevant experience working with K-8 students.",
    required: false,
  },
  {
    name: "availableinperson",
    type: "choice",
    question:
      "Are you available Monday-Friday 2:30 - 6:00pm (Tuesdays 1:30-5PM) for in-person tutoring?*",
    required: true,
    choices: [
      { text: "Yes", type: "text" },
      { text: "No", type: "text" },
      { text: "Other", type: "other" },
    ],
  },
  {
    name: "covidvaccine",
    type: "choice",
    question: "Are you Covid-19 Vaccinated?",
    required: false,
    choices: [
      { text: "Yes", type: "text" },
      { text: "No", type: "text" },
    ],
  },
  {
    name: "school",
    type: "text",
    question:
      "If hired for this position, which school would you like to work at?",
    subQuestion: (
      <>
        Please visit this link to view all schools:
        <a
          style={{ color: "inherit", marginLeft: "8px" }}
          href="https://tinyurl.com/LAUSDTutors"
          target="_blank"
        >
          https://tinyurl.com/LAUSDTutors
        </a>
      </>
    ),
    required: false,
  },
  {
    name: "howsoon",
    type: "text",
    question: "How soon can you start? *",
    required: true,
  },
  {
    name: "email",
    type: "email",
    question:
      "What email address can we reach you at? This is only to get in touch, not to send spam. *",
    subQuestion: "We love GDPR, and GDPR loves us.",
    required: true,
  },
  {
    name: "phone",
    type: "phone",
    question: "Please enter your phone number. *",
    subQuestion: "For a recruiter to reach out to you :)",
    required: true,
  },
];

export default questions;
