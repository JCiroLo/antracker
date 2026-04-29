import { Fade, Stack, useTheme } from "@mui/material";

type LoaderProps = {
  show: boolean;
};

const Loader: React.FC<LoaderProps> = ({ show }) => {
  const theme = useTheme();

  return (
    <Fade in={show}>
      <Stack
        position="fixed"
        zIndex={9999}
        top={0}
        left={0}
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        bgcolor="rgba(0,0,0,0.5)"
      >
        <svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="36"
            cy="66"
            r="4"
            fill={theme.palette.primary.main}
            style={{
              animationName: "scale_LDJPO, fade_LDJPO",
              animationDuration: "1.2s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: "0.00s",
              transformOrigin: "36px 66px",
            }}
          ></circle>
          <circle
            cx="51"
            cy="62"
            r="4"
            fill={theme.palette.primary.main}
            style={{
              animationName: "scale_LDJPO, fade_LDJPO",
              animationDuration: "1.2s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: "-0.10s",
              transformOrigin: "51px 62px",
            }}
          ></circle>
          <circle
            cx="62"
            cy="51"
            r="4"
            fill={theme.palette.primary.main}
            style={{
              animationName: "scale_LDJPO, fade_LDJPO",
              animationDuration: "1.2s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: "-0.20s",
              transformOrigin: "62px 51px",
            }}
          ></circle>
          <circle
            cx="66"
            cy="36"
            r="4"
            fill={theme.palette.primary.main}
            style={{
              animationName: "scale_LDJPO, fade_LDJPO",
              animationDuration: "1.2s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: "-0.30s",
              transformOrigin: "66px 36px",
            }}
          ></circle>
          <circle
            cx="62"
            cy="21"
            r="4"
            fill={theme.palette.primary.main}
            style={{
              animationName: "scale_LDJPO, fade_LDJPO",
              animationDuration: "1.2s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: "-0.40s",
              transformOrigin: "62px 21px",
            }}
          ></circle>
          <circle
            cx="51"
            cy="10"
            r="4"
            fill={theme.palette.primary.main}
            style={{
              animationName: "scale_LDJPO, fade_LDJPO",
              animationDuration: "1.2s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: "-0.50s",
              transformOrigin: "51px 10px",
            }}
          ></circle>
          <circle
            cx="36"
            cy="6"
            r="4"
            fill={theme.palette.primary.main}
            style={{
              animationName: "scale_LDJPO, fade_LDJPO",
              animationDuration: "1.2s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: "-0.60s",
              transformOrigin: "36px 6px",
            }}
          ></circle>
          <circle
            cx="21"
            cy="10"
            r="4"
            fill={theme.palette.primary.main}
            style={{
              animationName: "scale_LDJPO, fade_LDJPO",
              animationDuration: "1.2s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: "-0.70s",
              transformOrigin: "21px 10px",
            }}
          ></circle>
          <circle
            cx="10"
            cy="21"
            r="4"
            fill={theme.palette.primary.main}
            style={{
              animationName: "scale_LDJPO, fade_LDJPO",
              animationDuration: "1.2s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: "-0.80s",
              transformOrigin: "10px 21px",
            }}
          ></circle>
          <circle
            cx="6"
            cy="36"
            r="4"
            fill={theme.palette.primary.main}
            style={{
              animationName: "scale_LDJPO, fade_LDJPO",
              animationDuration: "1.2s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: "-0.90s",
              transformOrigin: "6px 36px",
            }}
          ></circle>
          <circle
            cx="10"
            cy="51"
            r="4"
            fill={theme.palette.primary.main}
            style={{
              animationName: "scale_LDJPO, fade_LDJPO",
              animationDuration: "1.2s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: "-1.00s",
              transformOrigin: "10px 51px",
            }}
          ></circle>
          <circle
            cx="21"
            cy="62"
            r="4"
            fill={theme.palette.primary.main}
            style={{
              animationName: "scale_LDJPO, fade_LDJPO",
              animationDuration: "1.2s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: "-1.10s",
              transformOrigin: "21px 62px",
            }}
          ></circle>
        </svg>
      </Stack>
    </Fade>
  );
};

export default Loader;
