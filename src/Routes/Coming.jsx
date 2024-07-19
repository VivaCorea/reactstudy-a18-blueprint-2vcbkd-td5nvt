import { getComingSoon } from "../api";
import Movies from "../Components/Movies";

export default function Coming() {
  return (
    <Movies
      queryObj={{ key: ["coming", "soon"], fn: getComingSoon }}
      pathKey={"coming-soon"}
    />
  );
}
