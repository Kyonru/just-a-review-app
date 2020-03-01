/* eslint-disable @typescript-eslint/indent */
import React, { PureComponent } from 'react';
import { ViewProps, View } from 'react-native';
import DateTimePicker, {
  IOSNativeProps,
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';
import { Modal, Portal, Button } from 'react-native-paper';

import HeaderFormInputButton from 'src/components/button/form-input';
import styles from './styles';

export class DatePicker extends PureComponent<
  (ViewProps & { label: string; displayValue?: string }) &
    (IOSNativeProps | AndroidNativeProps),
  { isModalOpen: boolean }
> {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({
      isModalOpen: !isModalOpen,
    });
  };

  renderInput = () => {
    const { isModalOpen } = this.state;
    return (
      <Portal>
        <Modal visible={isModalOpen} onDismiss={this.toggleModal}>
          <View style={styles.picker}>
            <DateTimePicker {...this.props} />
            <Button
              style={styles.button}
              mode="contained"
              onPress={this.toggleModal}
            >
              Ok
            </Button>
          </View>
        </Modal>
      </Portal>
    );
  };

  render() {
    const { displayValue, label } = this.props;
    return (
      <>
        <HeaderFormInputButton
          onPress={this.toggleModal}
          label={displayValue || label}
        />
        {this.renderInput()}
      </>
    );
  }
}

export default DatePicker;
