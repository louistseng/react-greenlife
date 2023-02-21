import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component that alerts if you click outside of it
 */
export default class OutsideAlerter extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    // && this.props.identityType === "1"
    if(this.props.firstLogin){
      if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.props.identityType === "1") {
        console.log("outside")
        this.props.setShowLeaveAlert(true)
        this.props.setLeaveAlertTitle("請填寫必填欄位：  Email、暱稱、出生年、性別")
      }
    }else{
      this.props.setShowLeaveAlert(false)
    }
   

  }

  render() {
    return <div ref={this.setWrapperRef} className="col-12 col-lg-8">{this.props.children}</div>;
  }
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
};
