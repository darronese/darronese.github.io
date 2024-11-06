import React, {useState, useEffect} from "react";
import { motion, useAnimation } from "framer-motion";

const BouncingMusicNotes = () => {
  const controls = useAnimation();
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update viewport dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to generate a random position within the viewport
  const getRandomPosition = () => {
    const padding = 50; // To ensure the note stays within bounds
    const x = Math.random() * (viewport.width - padding);
    const y = Math.random() * (viewport.height - padding);
    return { x, y };
  };

  // Animate to a new random position indefinitely
  useEffect(() => {
    const animate = async () => {
      while (true) {
        const target = getRandomPosition();
        await controls.start({
          x: target.x,
          y: target.y,
          transition: {
            duration: Math.random() * 3 + 2, // Random duration between 2-5 seconds
            ease: "easeInOut",
          },
        });
      }
    };
    animate();
  }, [controls, viewport]);

  return (
    <motion.img
      src={'./halfNote.png'}
      alt="Music Note"
      className="music-note"
      animate={controls}
      initial={{ x: 0, y: 0 }}
      style={{
        position: "fixed",
        width: "50px",
        height: "50px",
        zIndex: 0,
      }}
    />
  );
};

export default BouncingMusicNotes;
