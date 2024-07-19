import { getPopular } from "../api";
import Movies from "../Components/Movies";

export default function Home() {
  return (
    <Movies
      queryObj={{ key: ["movies", "popular"], fn: getPopular }}
      pathKey={"movies"}
    />
  );
}
