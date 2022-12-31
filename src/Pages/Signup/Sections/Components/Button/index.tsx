import { useContext } from "react";
import { referralContext } from "Contexts/contexts";
import { useNavigate } from "react-router-dom";
import { SxProps } from "@mui/system";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

function Button({
  children,
  className,
  sx,
  small,
  smallerDevice,
  openReferral,
  onClick,
}: {
  children: ReactNode;
  openReferral: boolean;
  className?: string;
  sx?: SxProps;
  small?: boolean;
  smallerDevice?: boolean;
  onClick?: Function;
}) {
  const smallerDeviceStyles =
    small || smallerDevice
      ? {
          width: smallerDevice ? "100%" : "unset",
          padding: "10px 20px",
          display: "grid",
          placeItems: "center",
          fontSize: "16px",
        }
      : {};

  const referralURL = useContext(referralContext);
  const navigate = useNavigate();

  return (
    <Box
      className={[styles.button, className].join(" ")}
      sx={{ ...sx, ...smallerDeviceStyles }}
      onClick={() => {
        if (openReferral) {
          if (referralURL.get.url) {
            navigate(referralURL.get.url);
          } else {
            navigate("/signup/form");
          }
        } else if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </Box>
  );
}

export default Button;
