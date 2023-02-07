import { useState, useRef, useEffect, useMemo } from "react";

export const Play = () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //canvas
  const canvasRef = useRef();

  //animate
  const requestRef = useRef();
  const previousTimeRef = useRef();

  useEffect(() => {
    if (canvasRef) {
      const c = canvasRef.current.getContext("2d");
      
      
      class Player {
        constructor({ position }) {
          this.position = position;
          this.velocity = {
            x: 0,
            y: 1,
          };
          this.height = 40;
          this.width = 20;
        }

        draw() {
          c.fillStyle = "red";
          c.fillRect(this.position.x, this.position.y, 50, 50);
        }

        update() {
          this.draw();

          this.position.x += this.velocity.x;
          this.position.y += this.velocity.y;

          if (
            this.position.y + this.height + this.velocity.y <
            canvasRef.height - 15
          ) {
            this.velocity.y += gravity;
          } else {
            this.velocity.y = 0;
          }
        }
      }

      const player = new Player({
        position: { x: 50, y: -20 },
      });

      const animate = (time) => {
        if (previousTimeRef.current != undefined) {
          const deltaTime = time - previousTimeRef.current;
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);

        if (canvasRef && c) {
          canvasRef.width = 200;
          c.fillStyle = "white";
          c.fillRect(0, 0, canvasRef.width, canvasRef.height);

          player.draw();
          player.update();
        }
      };

      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);

      const gravity = 0.3;

      animate();

      const jump = () => {
        console.log("jumping");
        player.velocity.y = -7.5;
      };
    }
  }, [canvasRef, input]);

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef} />
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
