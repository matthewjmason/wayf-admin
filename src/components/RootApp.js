import PropTypes from 'prop-types';
import React from 'react';
import { 
  createFragmentContainer, 
  graphql 
} from 'react-relay';
class RootApp extends React.Component {
  render() {
    <div data-framework="relay">
        {this.props.children}
    </div>
  }
}

export default createFragmentContainer(
  RootApp,
  graphql`
    fragment RootApp_viewer on viewer {
      viewerId
    }
  `
);

