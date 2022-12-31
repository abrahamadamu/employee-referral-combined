import { Typography, useMediaQuery } from "@mui/material";
import styles from "./styles.module.scss";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type PostType = {
  title: string;
  details: string;
  image: string;
  name: string;
  time: string;
};

const posts1: (
  | PostType
  | {
      width?: number;
      radii: [boolean, boolean, boolean, boolean];
    }
)[] = [
  { width: 5, radii: [false, true, true, false] },
  {
    title: "Elementary Math tutoring job",
    details: "My daughter needs some tutoring in math.",
    image: "/images/profilepics/olivia.svg",
    name: "Olivia B",
    time: "Posted 2 hours ago",
  },
  { radii: [false, true, false, true] },
  {
    title: "Reading tutoring job",
    details: "I’m seeking a tutor for my children.",
    image: "/images/profilepics/emma.svg",
    name: "Emma J",
    time: "Posted 1 hour ago",
  },
  { radii: [true, false, true, false] },
];
const posts2: (
  | PostType
  | {
      width?: number;
      radii: [boolean, boolean, boolean, boolean];
    }
)[] = [
  { radii: [false, true, false, false] },
  {
    title: "Writing tutoring job",
    details:
      "I need to meet for a lesson to help my son with next month's writing.",
    image: "/images/profilepics/james.svg",
    name: "James P",
    time: "Posted 15 minutes ago",
  },
  { radii: [true, false, true, true] },
  {
    title: "Vocabulary tutoring job",
    details:
      "I need to meet for a lesson to help my son with next month's vocabulary.",
    image: "/images/profilepics/mary.svg",
    name: "Mary S",
    time: "Posted 2 hours ago",
  },
  { width: 20, radii: [true, true, false, true] },
];

function Jobs() {
  const smhigh = useMediaQuery("(min-width: 700px)");
  const highmd = useMediaQuery("(min-width: 1000px)");

  return (
    <div
      className={styles.Jobs}
      style={
        smhigh
          ? {}
          : { padding: "72px 0", paddingBottom: "20px", borderRadius: "56px" }
      }
    >
      <Typography
        variant="title1"
        fontSize={highmd ? "52px" : smhigh ? "40px" : "32px"}
        fontWeight="normal"
        paddingLeft={highmd ? "80px" : "40px"}
        marginBottom={highmd ? "64px" : "24px"}
        lineHeight="38px"
      >
        Current Tutoring Jobs
      </Typography>

      {smhigh ? (
        <>
          <PostList posts={posts1} />
          <PostList posts={posts2} />
        </>
      ) : (
        <Carousel
          showThumbs={false}
          emulateTouch
          centerMode
          centerSlidePercentage={95}
          showStatus={false}
          className={styles.carousel}
        >
          {(() => {
            const combinedPosts = [...posts1, ...posts2];

            const posts: PostType[] = combinedPosts.filter((item) => {
              function isPost(item: any): item is PostType {
                return (item as PostType).title !== undefined;
              }

              return isPost(item);
            }) as PostType[];

            return posts.map((post) => (
              <Post key={post.title} {...post} fullWidth />
            ));
          })()}
        </Carousel>
      )}
    </div>
  );
}

function PostList({
  posts,
}: {
  posts: (
    | PostType
    | {
        width?: number;
        radii: [boolean, boolean, boolean, boolean];
      }
  )[];
}) {
  const highmd = useMediaQuery("(min-width: 1000px)");

  return (
    <div className={styles.limitCnt}>
      <div
        className={styles.container}
        style={highmd ? {} : { width: "100%", justifyContent: "center" }}
      >
        {posts.map((item, i) => {
          function isPost(item: any): item is PostType {
            return (item as PostType).title !== undefined;
          }

          if (isPost(item)) {
            return <Post key={item.title} {...item} />;
          } else {
            return <Shape key={i} {...item} />;
          }
        })}
      </div>
    </div>
  );
}

function Shape({
  width,
  radii,
}: {
  width?: number;
  radii: [boolean, boolean, boolean, boolean];
}) {
  const vhighmd = useMediaQuery("(min-width: 1100px)");
  const highmd = useMediaQuery("(min-width: 1000px)");

  const borderRadius = `${radii[0] ? "108" : "0"}px ${
    radii[1] ? "108" : "0"
  }px ${radii[2] ? "108" : "0"}px ${radii[3] ? "108" : "0"}px`;

  width = width ?? 40;
  width = width * (vhighmd ? 1 : 0.7);

  if (!highmd) return <></>;

  return (
    <div
      className={styles.shape}
      style={{ borderRadius: borderRadius, width: width + "%" }}
    ></div>
  );
}
function Post({
  title,
  details,
  image,
  name,
  time,
  fullWidth,
}: PostType & { fullWidth?: boolean }) {
  const highmd = useMediaQuery("(min-width: 1000px)");

  return (
    <div
      className={styles.post}
      style={{
        ...(highmd ? {} : { width: "47%" }),
        ...(fullWidth
          ? { width: "98%", marginLeft: "10px", marginBottom: "20px" }
          : {}),
      }}
    >
      <Typography
        className={styles.title}
        color="#9663fc"
        fontSize="18px"
        fontWeight="bold"
        lineHeight="34px"
        textAlign="start"
      >
        {title}
      </Typography>
      <Typography
        textAlign="start"
        className={styles.details}
        fontSize="14px"
        lineHeight="24px"
      >
        {details}
      </Typography>
      <div className={styles.profile}>
        <div className={styles.picture}>
          <img src={image} alt="profile" />
        </div>
        <div className={styles.texts}>
          <Typography
            className={styles.name}
            fontWeight="bold"
            textAlign="start"
          >
            {name}
          </Typography>
          <Typography className={styles.time} fontSize="14px">
            {time}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
