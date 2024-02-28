import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

const data = [
  {
    src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
    title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
    channel: "Don Diablo",
    views: "396k views",
    createdAt: "a week ago",
  },
  {
    src: "https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA",
    title: "Queen - Greatest Hits",
    channel: "Queen Official",
    views: "40M views",
    createdAt: "3 years ago",
  },
  {
    src: "https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw",
    title: "Calvin Harris, Sam Smith - Promises (Official Video)",
    channel: "Calvin Harris",
    views: "130M views",
    createdAt: "10 months ago",
  },
];

function Media(props) {
  const { loading = false } = props;
  const [loaded, setLoading] = React.useState(false);
  const counter = React.useRef(0);
  const imageLoad = () => {
    setLoading(true);
  };

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= data.length) {
      setLoading(false);
    }
  };

  return (
    <Grid container wrap="nowrap">
      {!loaded &&
        Array.from(new Array(7)).map((item, index) => (
          <Box key={index} sx={{ width: 210, marginRight: 10, my: 5 }}>
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={265}
              height={400}
            />
          </Box>
        ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function TVShows() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Media loading />
      <Media />
    </Box>
  );
}
