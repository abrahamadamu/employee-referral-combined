export type GetLinkParams = {
  email: string;
  firstname: string;
  lastname: string;
  linktype: string;
};
export type LinkData = {
  linktype: string;
  email: string;
  firstname: string;
  lastname: string;
  date: number;
};

export type FormData = {
  meta_referral: string;
  meta_time: number;
  [data: string]: string | number;
};
