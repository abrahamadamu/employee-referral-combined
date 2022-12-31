import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

admin.initializeApp();

import * as DbMan from "./dbman";

const app = express();
app.use(cors());
// app.use((req,res,next)=>{

// })

app.post("/getlink", async (req, res) => {
  const params = req.body;
  const link = await DbMan.getLink(params);
  res.send(link);
});

app.post("/saveform", async (req, res) => {
  console.log("HERE :)");
  const params = req.body;
  console.log({ params });
  const link = await DbMan.saveForm(params);
  res.send(link);
});

app.post("/saveminiform", async (req, res) => {
  console.log("HERE :)");
  const params = req.body;
  console.log({ params });
  const link = await DbMan.saveMiniForm(params);
  res.send(link);
});

export const employeereferral = functions.https.onRequest(app);
