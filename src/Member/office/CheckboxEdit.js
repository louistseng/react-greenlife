import React from 'react';
import PropTypes from 'prop-types';


const Checkbox = ({ type = 'checkbox', name, onClick, defaultChecked, checked, readOnly, className = "evaluation_checkbox" }) => (
  <>
    <label for={name}></label>
    <input type={type} name={name} id={name} onClick={onClick} defaultChecked={defaultChecked} checked={checked} readOnly={readOnly} className={className} />
  </>
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
}

export default Checkbox;