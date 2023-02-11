import { Canvas } from "./Game/Canvas";
import { PlayForm } from "./PlayForm";

export const PlayFrame = () => {
  return (
    <>
      <div className="playOuter">
        <div
          style={{
            zIndex: 8,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -140%)",
          }}
        >
          <Canvas />
        </div>
      </div>
      <PlayForm />
    </>
  );
};
