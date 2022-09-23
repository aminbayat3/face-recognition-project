import "./image-link-form.styles.scss";

const ImageLinkForm = ({ onButtonSubmit, ...otherProps }) => {
  return (
    <div className="image-link-container">
      <p className="image-link-title">
        This Magic Robot will detect faces in your pictures. Give it a try.
      </p>
      <div className="image-link-wrapper">
        <input className="image-link-input" {...otherProps} />
        <button className="detect-button" onClick={onButtonSubmit}>
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
