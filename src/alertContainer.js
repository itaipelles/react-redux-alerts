import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as alertActions from './actions'; 

const createAlert = config => WrappedComponent => {
  const { alertName } = config;

  class AlertContainer extends Component {
    componentDidMount() {
      this.props.actions.initializeAlert(alertName);
    }

    componentWillUnmount() {
      this.props.actions.destroyAlert(alertName);
    }

    close() {
      this.props.actions.dismissAlert(alertName);
    }
    render() {
      if(!this.props.isVisible) return false;
      return (
        <WrappedComponent {...this.props} close={() => this.close()} />
        );
    }
  }

  function mapStateToProps (state) {
    return { isVisible: state.alerts ? state.alerts[alertName] : false };
  };

  function mapDispatchToProps (dispatch) {
    return { actions: bindActionCreators(alertActions, dispatch) };
  };
  return connect(mapStateToProps, mapDispatchToProps)(AlertContainer);
  
};

export default createAlert;
