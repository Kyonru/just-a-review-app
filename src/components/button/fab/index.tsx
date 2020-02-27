import React, {Component} from 'react';
import {FAB, Portal} from 'react-native-paper';

class FABButton extends Component<{
  options: any;
}> {
  state = {
    open: false,
  };

  render() {
    return (
      <Portal>
        <FAB.Group
          visible={true}
          open={this.state.open}
          icon={this.state.open ? 'close' : 'plus'}
          actions={this.props.options}
          onStateChange={({open}) => this.setState({open})}
        />
      </Portal>
    );
  }
}

export default FABButton;
