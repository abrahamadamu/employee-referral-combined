const local = window.location.href.indexOf("localhost") >= 330;

export const backend = local
  ? "http://localhost:5001/heytutor-referral/us-central1/employeereferral"
  : "https://us-central1-heytutor-referral.cloudfunctions.net/employeereferral";
