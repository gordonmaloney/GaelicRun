import { Canvas } from "./Game/Canvas";
import { player } from "./Game/Canvas";
import { useState } from "react";
import { obstacle } from "./Game/Canvas";
import { PlayForm } from "./PlayForm";

export const PlayFrame = () => {
  return (
    <>
      <div className="playOuter">
        <div style={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -140%)' }}>
          <Canvas />
        </div>
      </div>
      <PlayForm />
    </>
  );
};
