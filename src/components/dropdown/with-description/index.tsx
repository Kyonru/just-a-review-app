import React, { useState, useCallback } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text, Modal, Portal, withTheme, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { DropdownOption } from 'src/@types';

import styles from '../styles';

const ModalPickerItem = ({
  data,
  selected,
  onPress,
  color,
  onDismiss,
}: {
  data: DropdownOption;
  selected: boolean;
  onPress: (value: DropdownOption) => void;
  color: string;
  onDismiss: () => void;
}) => {
  const onSelectOption = useCallback(() => {
    onPress(data);
    onDismiss();
  }, [data]);

  return (
    <TouchableOpacity onPress={onSelectOption}>
      <View style={styles.dropdownOption}>
        <Text>{data.label}</Text>
        {selected ? <Icon color={color} name="check" size={16} /> : null}
      </View>
    </TouchableOpacity>
  );
};

const ModalPicker = ({
  theme,
  isOpen,
  onDismiss,
  options,
  selectedValue,
  comparisonMapper,
  onSelect,
}: {
  isOpen: boolean;
  onDismiss: () => void;
  onSelect: (value: DropdownOption) => void;
  options: DropdownOption[];
  selectedValue?: string;
  theme: any;
  comparisonMapper?: (value: any, selectedValue: any) => boolean;
}) => {
  return (
    <Portal>
      <Modal
        visible={isOpen}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <TouchableOpacity
          activeOpacity={0.99}
          style={styles.background}
          onPress={onDismiss}
        >
          <View
            onStartShouldSetResponder={() => true}
            style={styles.pickerOptionsContainer}
          >
            <View
              style={{
                padding: 16,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>Language</Text>
            </View>
            {options.map(option => (
              <ModalPickerItem
                key={`${option.label}`}
                selected={
                  (comparisonMapper &&
                    comparisonMapper(option.value, selectedValue)) ||
                  option.value === selectedValue
                }
                onPress={onSelect}
                color={theme.colors.accent}
                data={option}
                onDismiss={onDismiss}
              />
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </Portal>
  );
};

const Dropdown = ({
  style,
  options,
  label,
  value,
  optionSelected,
  theme,
  comparisonMapper,
  onSelect,
}: {
  theme: any;
  options: DropdownOption[];
  style?: ViewStyle;
  optionSelected?: string;
  comparisonMapper?: (value: any, selectedValue: any) => boolean;
  onSelect: (value: DropdownOption) => void;
} & DropdownOption) => {
  const [isModalOpen, setModalVisible] = useState(false);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, [isModalOpen]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, [isModalOpen]);

  return (
    <>
      <TouchableOpacity onPress={openModal}>
        <List.Item
          style={[styles.header, style]}
          title={label}
          description={value}
        />
      </TouchableOpacity>
      <ModalPicker
        options={options}
        isOpen={isModalOpen}
        onDismiss={closeModal}
        selectedValue={optionSelected}
        theme={theme}
        comparisonMapper={comparisonMapper}
        onSelect={onSelect}
      />
    </>
  );
};

export default withTheme(Dropdown);
