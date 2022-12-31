import { CSSProperties } from "react";
// import { TypographyVariants } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title1: CSSProperties;
  }
  interface TypographyVariantsOptions {
    title1?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title1: true;
  }
}
