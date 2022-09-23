import "./home-page.styles.scss";

const HomePage = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState(boxDefaultValues);
  const imageRef = useRef();

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

    // first approach(not a best one) whenever this function gets called we are creating all these new variables
    // const newLeftCol = clarifaiFace.left_col * width;
    // const newTopRow = clarifaiFace.top_row * height;
    // const newRightCol = width - (clarifaiFace.right_col * width);
    // const newBottomRow = height - (clarifaiFace.bottom_row * height);

    // setBox({
    //   leftCol: newLeftCol,
    //   topRow: newTopRow,
    //   rightCol: newRightCol,
    //   bottomRow: newBottomRow,
    // });

    // better way
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
