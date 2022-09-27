import Button from "../button/button.component";

import "./image-link-form.styles.scss";

const ImageLinkForm = ({ onButtonSubmit, ...otherProps }) => {
  return (
    <div className="image-link-container">
      <p className="image-link-title">
        This Magic Robot will detect faces in your pictures. Give it a try.
      </p>
      <div className="image-link-wrapper">
        <input className="image-link-input" {...otherProps} />
        <Button type='submit' onClick={onButtonSubmit}>
          Detect
        </Button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
