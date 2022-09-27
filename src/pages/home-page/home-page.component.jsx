import { useState, useCallback, useRef, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Clarifai from "clarifai";

import Navigation from '../../components/navigation/navigation.component';
import Logo from '../../components/logo/logo.component';
import ImageLinkForm from "../../components/image-link-form/image-link-form.component";
import Rank from '../../components/rank/rank.component';
import FaceRecognition from "../../components/face-recognition/face-recognition.component";

import "./home-page.styles.scss";

const app = new Clarifai.App({
  apiKey: "12656066e65d422e822e7f984827b51a",
});

const particlesOptions = {
  // background: {
  //   color: {
  //     value: "#e5e5f7",
  //   },
  // },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: false,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.2,
      },
    },
  },
  particles: {
    color: {
      value: "#FFFFFF",
    },
    links: {
      color: "#00938B",
      distance: 120,
      enable: true,
      opacity: 0.7,
      width: 2.2,
    },
    collisions: {
      enable: false,
    },
    move: {
      directions: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 4,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 650,
      },
      value: 70,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
};

const boxDefaultValues = {
  //*important:  since this object is outside the App function it doesn't get reinitilaized everytime as a result the box object in the state will remain constant, so we dont need to use things like a custom hook or useMemo to prevent the application from falling into an infinit loop
  leftCol: null,
  topRow: null,
  rightCol: null,
  bottomRow: null,
};

const HomePage = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState(boxDefaultValues);
  const imageRef = useRef();

  useEffect(() => {
    console.log(box);
  }, [box]); // using an object in a dependency array

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const calculateFaceLocation = (data) => {
    const { current } = imageRef;

    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const width = Number(current.width);
    const height = Number(current.height);

    // i think a more readable one is this (i know it's not great for debugging but it's more readable)
    setBox({
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    });

    //one good way is to return an object here then in another function deal with the state update. Although i think the last solution is the best one // because andre wanted to deal with setState which should have been something like this setState({...state, box: {}}) so it would be a little hard to read but setBox({}) is readable enough
    // return {
    //   leftCol: clarifaiFace.left_col * width,
    //   topRow: clarifaiFace.top_row * height,
    //   rightCol: width - clarifaiFace.right_col * width,
    //   bottomRow: height - clarifaiFace.bottom_row * height,
    // };

    // first approach(this is good especially when the calculations get more complex and it's also good for debugging)
    // const LeftCol = clarifaiFace.left_col * width;
    // const TopRow = clarifaiFace.top_row * height;
    // const RightCol = width - (clarifaiFace.right_col * width);
    // const BottomRow = height - (clarifaiFace.bottom_row * height);

    // setBox({
    //   leftCol,
    //   topRow,
    //   rightCol,
    //   bottomRow,
    // });

    // another way
    // const newBoxValues = {  // we could do it in a one single setBox
    //   leftCol: clarifaiFace.left_col * width,
    //   topRow: clarifaiFace.top_row * height,
    //   rightCol: width - (clarifaiFace.right_col * width),
    //   bottomRow: height - (clarifaiFace.bottom_row * height),
    // }
    // setBox({...newBoxValues});
  };

  // const displayFaceBox = (box) => {
  //   setBox(box);
  // }

  const onInputChange = (event) => {
    const { value } = event.target;
    setInput(value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => calculateFaceLocation(response))
      .catch((err) => console.log(err));
  };

  return (
    <div className="home-page">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        type="text"
        value={input}
        onChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition box={box} imageRef={imageRef} imageUrl={imageUrl} />
    </div>
  );
};

export default HomePage;
