import * as admin from "firebase-admin";
import { GetLinkParams, LinkData, FormData } from "./types";

const db = admin.firestore();
const Links = db.collection("links");
const Linktypes = db.collection("linktypes");
const MainForm1 = db.collection("submissions/signup/form1");
const MiniForm1 = db.collection("submissions/signup/miniform1");

/**
 * Gets/Create link
 * @param {GetLinkParams} params
 * @return {string} a unique referral link
 */
async function getLink(params: GetLinkParams) {
  //   console.log("PARAMS", params);
  //   console.log("TYPE: ",typeof params);
  if (
    !params.email ||
    !params.firstname ||
    !params.lastname ||
    !params.linktype
  ) {
    throw Error("Incomplete parameters to generate link");
  }

  params.email = (params.email + "").toLowerCase();
  params.firstname = (params.firstname + "").toLowerCase();
  params.lastname = (params.lastname + "").toLowerCase();

  let bareLink = (await Linktypes.doc(params.linktype).get()).data()?.link;

  if (!bareLink) throw Error("Linktype doesn't exist");
  bareLink = (bareLink + "").replace(/\/*$/, "");

  let linkID = await Links.where("email", "==", params.email)
    .where("linktype", "==", params.linktype)
    .get()
    .then((snapshot) => {
      if (snapshot.docs.length > 0) {
        return snapshot.docs[0].id;
      } else {
        return null;
      }
    });

  if (!linkID) linkID = await generateLinkID(params);

  return bareLink + "/" + linkID;
}
/**
 * Gets new link id
 * @param {GetLinkParams} params
 * @return {string} New link ID
 */
async function generateLinkID(params: GetLinkParams) {
  let UID;
  do {
    UID = generateUID();
  } while ((await Links.doc(UID).get()).exists);

  const linkData: LinkData = {
    email: params.email,
    firstname: params.firstname,
    lastname: params.lastname,
    date: new Date().getTime(),
    linktype: params.linktype,
  };

  Links.doc(UID).set(linkData);

  return UID;
}

/**
 * Generate new ID
 * @return {string}
 */
function generateUID() {
  let UID = new Array(7).fill("");
  UID = UID.map(() => {
    const random = Math.round(Math.random() * 62);

    if (random < 10) {
      return random;
    } else if (random < 36) {
      return String.fromCharCode(random - 10 + 65);
    } else {
      return String.fromCharCode(random - 36 + 97);
    }
  });
  return UID.join("");
}

/**
 * Saves entered form to database
 * @param {FormData} params
 * @return {object}
 */
function saveForm(params: FormData) {
  if (!params) throw Error("No parameters provided");
  params.meta_time = new Date().getTime();
  params.meta_referral = params.meta_referral ?? "";

  return MainForm1.add(params)
    .then(() => ({ success: true }))
    .catch(() => ({ success: false }));
}

/**
 * Save mini form data to database
 * @param {FormData} params
 * @return {object} success status
 */
function saveMiniForm(params: FormData) {
  if (!params) throw Error("No parameters provided");
  params.meta_time = new Date().getTime();
  params.meta_referral = params.meta_referral ?? "";

  return MiniForm1.add(params)
    .then(() => ({ success: true }))
    .catch(() => ({ success: false }));
}

export { getLink, saveForm, saveMiniForm };
