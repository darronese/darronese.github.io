import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

//screenshots
import mainScreen from "./mainScreen.png";
import gamePicOne from "./pictureOne.png";
import gamePicTwo from "./pictureTwo.png";
import gamePicThree from "./pictureThree.png";

function GameCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className= "gameCarousel">
      <Carousel.Item interval={5000}>
        <img className="gameMainMenu" src={mainScreen} />
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img className="gamePicOne" src={gamePicOne} />
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img className="gamePicTwo" src={gamePicTwo} />
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img className="gamePicThree" src={gamePicThree} />
      </Carousel.Item>
    </Carousel>
  );
}
export default GameCarousel;
