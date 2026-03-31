import { AudioWaveIcon } from "../icons";

const Audio = ({
  className = undefined, // String
  ...props
}) => (
  <AudioWaveIcon
    className={`svg-loaders-svg${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export { Audio };
