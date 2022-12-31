import { ReactNode } from "react";
import styles from "./styles.module.scss";

function NavItem({
  children,
  url,
  otherprops,
  hovered,
}: {
  children: ReactNode;
  url: string;
  otherprops?: Record<string, Record<string, any>>;
  hovered: boolean;
}) {
  return (
    <div
      // disableRipple
      {...otherprops}
      onClick={() => {
        if (url) window.location.href = url;
      }}
      // className={styles.test}
      className={[styles.button, hovered ? styles.hovered : ""].join(" ")}
    >
      {children}
    </div>
  );
}

export default NavItem;
