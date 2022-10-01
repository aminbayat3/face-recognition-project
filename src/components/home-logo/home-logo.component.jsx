import Tilt from "react-parallax-tilt";
import { ReactComponent as RobotLogo } from '../../assets/robot.svg';
// import robot from '../../assets/robot.png'

import "./home-logo.styles.scss";

const HomeLogo = () => {
  return (
      <Tilt className="home-logo-container" tiltMaxAngleX={50} tiltMaxAngleY={50} >
          <RobotLogo />
      </Tilt>
  );
};

export default HomeLogo;
