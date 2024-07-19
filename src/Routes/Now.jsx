import { getNowPlaying } from "../api";
import Movies from "../Components/Movies";

export default function Now() {
  return (
    <Movies
      queryObj={{ key: ["now", "playing"], fn: getNowPlaying }}
      pathKey={"now-playing"}
    />
  );
}
