import "./face-recognition.styles.scss";

const FaceRecognition = ({ box, imageRef, imageUrl }) => {
  const { leftCol, topRow, rightCol, bottomRow } = box;
  return (
    <div className="face-recognition-container">
      <div className="image-container">
        <img ref={imageRef} alt="" src={imageUrl} />
        <div
          className="bounding-box"
          style={{
            top: topRow,
            left: leftCol,
            right: rightCol,
            bottom: bottomRow,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
