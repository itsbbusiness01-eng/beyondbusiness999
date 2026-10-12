import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Loader } from "../components/beyond/Loader";
import { SmoothScroll } from "../components/beyond/SmoothScroll";
import { Cursor } from "../components/beyond/Cursor";
import { Site } from "../components/beyond/Site";
import { MusicPlayer } from "@/components/beyond/Musicplayer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);
  return (
    <>
      <Loader onDone={onDone} />
      {loaded && (
        <>
          <SmoothScroll />
          <Cursor />
          <MusicPlayer />
        </>
      )}
      <Site />
    </>
  );
}
