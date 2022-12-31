import { useState, useRef, CSSProperties } from "react";
import {
  Toolbar,
  Box,
  MenuItem,
  MenuList,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import styles from "./styles.module.scss";
import { AppBar, LoginButton, Img } from "./components";
import NavItem from "./NavItem";
import NavWindow from "./NavWindow";

function NavBar({ border }: { border?: boolean }) {
  const [anchorEl, setAnchorEl] = useState<any>({ element: null, index: 0 });
  const menuOpen = useRef({ button: 0, menu: 0 });

  const [navWindowOpen, setNavWindowOpen] = useState(false);

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const highmd = useMediaQuery("(min-width:1000px)");

  const navItems = [
    {
      name: "Impact",
      url: "",
      menus: [
        {
          name: "Partnerships & Case Studies",
          url: "https://heytutor.com/partnerships",
        },
        {
          name: "Data Analysis",
          url: "https://heytutor.com/partnerships/data-analysis",
        },
        {
          name: "Curriculum",
          url: "https://heytutor.com/partnerships/curriculum",
        },
      ],
    },
    { name: "Private Tutoring", url: "https://heytutor.com/tutors/" },
    {
      name: "Tutors",
      url: "",
      menus: [
        {
          name: "Create a Profile",
          url: "https://heytutor.com/become-a-tutor",
        },
        {
          name: "Tutoring jobs",
          url: "https://heytutor.com/partnerships/tutoring-jobs",
        },
      ],
    },
    { name: "About Us", url: "https://heytutor.com/about-us/" },
    { name: "Contact Us", url: "https://heytutor.com/contact-us/" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={border ? { borderBottom: "solid 1px #ddd" } : {}}
    >
      <Toolbar sx={{ gap: { md: highmd ? 3 : 1, xl: 4.6 } }}>
        <Box>
          <Img alt="logo" src="/images/logo.svg" />
        </Box>
        <Box flexGrow="1" />
        {md &&
          navItems.map((navItem, i) => {
            return (
              <NavItem
                key={navItem.name}
                url={navItem.url}
                hovered={!!anchorEl.element && anchorEl.index === i}
                otherprops={{
                  onMouseOver: (e: any) => {
                    setAnchorEl({ element: e.currentTarget, index: i });
                    menuOpen.current = { button: 1, menu: 1 };
                  },
                  onMouseLeave: (e: any) => {
                    setAnchorEl({ element: null, index: i });
                    // console.log("left");
                  },
                }}
              >
                {navItem.name}
                {i === anchorEl.index && (
                  <Menu anchor={anchorEl.element} menus={navItem.menus} />
                )}
              </NavItem>
            );
          })}
        {md ? (
          <LoginButton
            onClick={() => {
              window.location.href = "https://auth.heytutor.com/";
            }}
          >
            Login
          </LoginButton>
        ) : (
          <div
            className={styles.menu}
            onClick={() => setNavWindowOpen(!navWindowOpen)}
          >
            <span
              className={styles.top + " " + (navWindowOpen && styles.topCross)}
            />
            <span
              className={styles.mid + " " + (navWindowOpen && styles.midCross)}
            />
            <span
              className={styles.bot + " " + (navWindowOpen && styles.botCross)}
            />
          </div>
        )}

        <div></div>
      </Toolbar>
      {!md && (
        <NavWindow
          navItems={navItems}
          open={navWindowOpen}
          LoginButton={
            <LoginButton
              fullWidth
              onClick={() => {
                window.location.href = "https://auth.heytutor.com/";
              }}
            >
              Login
            </LoginButton>
          }
        />
      )}
    </AppBar>
  );
}

function Menu({
  anchor,
  menus,
}: {
  anchor: HTMLElement;
  menus: { name: string; url: string }[] | undefined;
}) {
  if (!anchor || !menus) return <></>;

  const style: CSSProperties = {
    position: "absolute",
    left: 0, //anchor.offsetLeft + "px",
    top: anchor.offsetHeight - 6 + "px",
    color: "black",
    backgroundColor: "#ffda7a",
    minWidth: "90px",
    borderRadius: "10px",
    borderTopLeftRadius: "0",
  };

  return (
    <div style={style}>
      <MenuList>
        {menus.map((menu) => (
          <a href={menu.url} style={{ textDecoration: "none" }} key={menu.name}>
            <HoverMenuItem
              onclick={() => console.log("ahh")}
              name={menu.name}
            />
          </a>
        ))}
      </MenuList>
    </div>
  );
}
function HoverMenuItem({
  name,
  onclick,
}: {
  name: string;
  onclick: () => void;
}) {
  const sx = {
    fontSize: "14px",
    fontWeight: "400",
    color: "#3c3d40",
    height: "32px",
    "&:hover": { backgroundColor: "#fff496" },
  };
  return (
    <MenuItem disableRipple onClick={() => console.log("something")} sx={sx}>
      {name}
    </MenuItem>
  );
}

export default NavBar;
