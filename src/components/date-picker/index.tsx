/* eslint-disable @typescript-eslint/indent */
import React, { PureComponent } from 'react';
import {
  ViewProps,
  View,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import DateTimePicker, {
  IOSNativeProps,
  AndroidNativeProps,
  Event,
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
    if (!isModalOpen) {
      Keyboard.dismiss();
    }
    this.setState({
      isModalOpen: !isModalOpen,
    });
  };

  onChange = (event: Event, value?: Date) => {
    let date = value;

    if (!date) {
      date = new Date();
    }
    this.setState({
      isModalOpen: false,
    });

    if (this.props.onChange) {
      this.props.onChange(event, date);
    }
  };

  renderInput = () => {
    const { isModalOpen } = this.state;

    if (Platform.OS === 'android' && isModalOpen) {
      return <DateTimePicker {...this.props} onChange={this.onChange} />;
    }

    if (Platform.OS === 'android') {
      return null;
    }

    return (
      <Portal>
        <Modal
          visible={isModalOpen}
          onDismiss={this.toggleModal}
          contentContainerStyle={styles.modal}
        >
          <TouchableOpacity
            style={styles.background}
            onPress={this.toggleModal}
          >
            <View style={styles.picker}>
              <DateTimePicker {...this.props} onChange={this.onChange} />
              <Button
                style={styles.button}
                mode="contained"
                onPress={this.toggleModal}
              >
                Ok
              </Button>
            </View>
          </TouchableOpacity>
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
