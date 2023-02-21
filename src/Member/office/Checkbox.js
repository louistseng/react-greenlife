import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, readOnly, className }) => (
  <>
    <label for={name}></label>
    <input readOnly={readOnly} type={type} name={name} id={name} checked={checked} onChange={onChange} className={className} />
  </>
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
}

export default Checkbox;