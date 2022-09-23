import "./face-recognition.styles.scss";

const FaceRecognition = ({ box, imageRef, imageUrl }) => {
  const { leftCol, topRow, rightCol, bottomRow } = box;
  console.log(
    `${leftCol},${topRow} ${rightCol},${topRow} ${rightCol},${bottomRow} ${leftCol},${bottomRow}`
  );
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

      {/* <svg>
        {leftCol && (
          <polygon
            points={`${leftCol},${topRow} ${rightCol},${topRow} ${rightCol},${bottomRow} ${leftCol},${bottomRow}`}
            fill="none"
            stroke="black"
          />
        )}
      </svg> */}
    </div>
  );
};

export default FaceRecognition;
