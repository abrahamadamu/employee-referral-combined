import { Abc as IconType } from "@mui/icons-material";
import styles from "./styles.module.scss";

function IconCircle({
  Icon,
  color,
  background,
}: {
  color: string;
  Icon: typeof IconType;
  background: string;
}) {
  return (
    <div className={styles.icon} style={{ backgroundColor: background }}>
      <Icon
        sx={{
          color: color,
          transform: "scale(1.1)",
        }}
      />
    </div>
  );
}

export default IconCircle;
