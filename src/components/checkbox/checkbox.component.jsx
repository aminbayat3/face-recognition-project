import { Fragment } from "react";

import "./checkbox.styles.scss";

const Checkbox = ({ label, ...otherProps}) => {
  return (
    <Fragment>
      <label>
        <input className="checkbox-input" {...otherProps} />
        <span className="checkbox-label">{label}</span>
      </label>
    </Fragment>
  );
};

export default Checkbox;
