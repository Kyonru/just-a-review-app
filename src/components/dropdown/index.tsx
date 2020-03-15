import React, { Component } from 'react';
import {
  TouchableOpacity,
  Platform,
  Picker,
  View,
  Text,
  Keyboard,
} from 'react-native';
import { Modal, Portal, withTheme, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { capitalize } from 'src/utils/strings';
import styles from './styles';
import { DropdownProps } from './props';

class Dropdown extends Component<DropdownProps & any> {
  state = {
    isModalOpen: false,
  };

  onHideModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  onShowModal = () => {
    Keyboard.dismiss();
    this.setState({
      isModalOpen: true,
    });
  };

  onSelectionChange = (value: string) => {
    const { onSelect } = this.props;
    onSelect(value);
  };

  renderIOS = () => {
    const { theme, selectedValue } = this.props;
    const { isModalOpen } = this.state;
    return (
      <>
        <TouchableOpacity onPress={this.onShowModal}>
          <View
            style={[
              styles.pickerIOSHeader,
              { borderColor: theme.colors.placeholder },
            ]}
          >
            <Text>{capitalize(selectedValue)}</Text>
            <Icon color={theme.colors.accent} name="menu-down" size={16} />
          </View>
        </TouchableOpacity>
        <Portal>
          <Modal
            visible={isModalOpen}
            onDismiss={this.onHideModal}
            contentContainerStyle={styles.modal}
          >
            <TouchableOpacity
              style={styles.background}
              onPress={this.onHideModal}
            >
              <View style={styles.pickerIOS}>
                {this.renderPicker()}
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={this.onHideModal}
                >
                  Ok
                </Button>
              </View>
            </TouchableOpacity>
          </Modal>
        </Portal>
      </>
    );
  };

  renderAndroid = () => {
    return (
      <View style={styles.pickerAndroidHeader}>{this.renderPicker()}</View>
    );
  };

  renderPicker = () => {
    const { selectedValue, options } = this.props;
    return (
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={this.onSelectionChange}
      >
        {options.map(this.renderOption)}
      </Picker>
    );
  };

  renderOption = ({ label, value }: { label: string; value: string }) => {
    return <Picker.Item key={`${label}${value}`} label={label} value={value} />;
  };

  render() {
    return Platform.OS === 'android' ? this.renderAndroid() : this.renderIOS();
  }
}

export default withTheme(Dropdown);
