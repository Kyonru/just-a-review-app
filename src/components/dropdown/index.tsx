import React, {Component} from 'react';
import {TouchableOpacity, Platform, Picker, View, Text} from 'react-native';
import {Modal, Portal, withTheme, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import {DropdownProps} from './props';
import {capitalize} from 'src/utils/strings';

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
    this.setState({
      isModalOpen: true,
    });
  };

  onSelectionChange = (value: string) => {
    this.props.onSelect(value);
  };

  renderIOS = () => {
    return (
      <>
        <TouchableOpacity onPress={this.onShowModal}>
          <View
            style={[
              styles.pickerIOSHeader,
              {borderColor: this.props.theme.colors.placeholder},
            ]}>
            <Text>{capitalize(this.props.selectedValue)}</Text>
            <Icon
              color={this.props.theme.colors.accent}
              name="menu-down"
              size={16}
            />
          </View>
        </TouchableOpacity>
        <Portal>
          <Modal visible={this.state.isModalOpen} onDismiss={this.onHideModal}>
            <View style={styles.pickerIOS}>
              {this.renderPicker()}
              <Button
                style={styles.button}
                mode="contained"
                onPress={this.onHideModal}>
                Ok
              </Button>
            </View>
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
    return (
      <Picker
        selectedValue={this.props.selectedValue}
        style={styles.picker}
        onValueChange={this.onSelectionChange}>
        {this.props.options.map(this.renderOption)}
      </Picker>
    );
  };

  renderOption = ({label, value}: {label: string; value: string}) => {
    return <Picker.Item key={`${label}${value}`} label={label} value={value} />;
  };

  render() {
    return Platform.OS === 'android' ? this.renderAndroid() : this.renderIOS();
  }
}

export default withTheme(Dropdown);
