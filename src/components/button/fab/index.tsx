import React, { Component } from 'react';
import { FAB, Portal } from 'react-native-paper';

class FABButton extends Component<{
  options: any;
  isVisible: boolean;
}> {
  state = {
    open: false,
  };

  render() {
    const { isVisible, options } = this.props;
    const { open } = this.state;
    return (
      <Portal>
        <FAB.Group
          testID="FAB_button"
          visible={isVisible}
          open={open}
          icon={open ? 'close' : 'plus'}
          actions={options}
          onStateChange={({ open: isOpen }) => this.setState({ open: isOpen })}
        />
      </Portal>
    );
  }
}

export default FABButton;
