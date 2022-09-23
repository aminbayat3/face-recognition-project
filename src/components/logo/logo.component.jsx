import Tilt from "react-parallax-tilt";
import { ReactComponent as RobotLogo } from '../../assets/robot.svg';
// import robot from '../../assets/robot.png'

import "./logo.styles.scss";

const Logo = () => {
  return (
      <Tilt className="logo-container" tiltMaxAngleX={50} tiltMaxAngleY={50} >
          <RobotLogo />
      </Tilt>
  );
};

export default Logo;
