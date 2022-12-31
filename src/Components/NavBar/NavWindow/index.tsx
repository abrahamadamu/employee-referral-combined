import { useState, ReactNode } from "react";
import { Divider, List, ListItem, Typography, Box, Grid } from "@mui/material";
import { ArrowCircleRight } from "@mui/icons-material";
import styles from "./styles.module.scss";

export default function NavWindow({
  navItems,
  open,
  LoginButton,
}: {
  navItems: {
    name: string;
    url: string;
    menus?: { name: string; url: string }[];
  }[];
  open: boolean;
  LoginButton: ReactNode;
}) {
  const [subMenu, setSubMenu] = useState<Record<string, boolean>>({
    Impact: true,
  });

  return open ? (
    <Box className={styles.navWindow + " " + (!open && styles.hidden)}>
      <List>
        {navItems.map((navItem, i) => (
          <>
            <ListItem
              className={styles.listItem}
              onClick={() =>
                setSubMenu({
                  ...subMenu,
                  [navItem.name]: !subMenu[navItem.name],
                })
              }
            >
              <Grid container direction="row" justifyContent="space-between">
                <Typography className={styles.navText}>
                  <a
                    {...(navItem.url ? { href: navItem.url } : {})}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {navItem.name}
                  </a>
                </Typography>
                {navItem.menus && (
                  <ArrowCircleRight
                    sx={
                      subMenu[navItem.name]
                        ? {
                            transform: "rotate(-180deg)",
                            transition: "transform 0.2s",
                          }
                        : { transition: "transform 0.2s" }
                    }
                  />
                )}
              </Grid>
            </ListItem>
            {subMenu[navItem.name] && navItem.menus && (
              <List sx={{ paddingTop: "0px" }} className={styles.subMenu}>
                {navItem.menus.map((menu, i) => (
                  <ListItem
                    sx={i == 0 ? { paddingTop: "0px" } : {}}
                    className={styles.subItems}
                  >
                    <a
                      {...(menu.url ? { href: menu.url } : {})}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {menu.name}
                    </a>
                  </ListItem>
                ))}
              </List>
            )}

            {(() => {
              if (i === navItems.length - 1) {
                return LoginButton;
              } else {
                return <Divider />;
              }
            })()}
          </>
        ))}
      </List>
    </Box>
  ) : (
    <></>
  );
}
