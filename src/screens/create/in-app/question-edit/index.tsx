import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { FAB, TextInput, List, Switch, IconButton } from 'react-native-paper';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ScreenContainer from 'src/components/screen-container';
import Dropdown from 'src/components/dropdown';
import {
  ReviewQuestion,
  ReviewQuestionOption,
  ReviewQuestionType,
} from 'src/@types';
import colors from 'src/theme/colors';
import { questionTypes } from 'src/data/question';
import { createReviewQuestionOption } from 'src/utils/questions';

import styles from './styles';

function QuestionEditScreen(props: any) {
  const { route, navigation } = props;
  const { params } = route;
  const { question, onSaveChanges } = params;

  const [value, setValue] = useState<ReviewQuestion>(question);
  const [option, setOption] = useState('');

  const onSave = () => {
    onSaveChanges(value);
    navigation.pop();
  };

  const onAddOption = () => {
    if (!option) {
      return;
    }
    setValue({
      ...value,
      options: [...(value.options || []), createReviewQuestionOption(option)],
    });
    setOption('');
  };

  const onDeleteOption = (item: ReviewQuestionOption) => () => {
    const action = () => {
      const index = value.options!.findIndex(
        (o: ReviewQuestionOption) => o.id === item.id,
      );

      setValue({
        ...value,
        options: [
          ...value.options!.slice(0, index),
          ...value.options!.slice(index + 1),
        ],
      });
    };

    Alert.alert('Delete option', "This action can't be undone.", [
      { text: 'Yes', onPress: action },
      { text: 'No' },
    ]);
  };

  const shouldRenderList =
    value.type === ReviewQuestionType.Choice ||
    value.type === ReviewQuestionType.Select;

  const OptionComponent = ({ item, drag }: any) => {
    return (
      <TouchableOpacity testID="option_item" onLongPress={drag}>
        <View style={styles.questionRow}>
          <View style={styles.questionContainer}>
            <Icon
              style={styles.questionLeftIcon as any}
              color="black"
              name="drag-handle"
              size={28}
            />

            <Text style={styles.question} textBreakStrategy="simple">
              {item.label}
            </Text>
          </View>

          <IconButton
            icon="close"
            color={colors.lynch}
            size={24}
            onPress={onDeleteOption(item)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenContainer
      containerProps={{ testID: 'avatar_edit_screen' }}
      containerStyle={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header} />
          <TextInput
            multiline
            mode="outlined"
            selectionColor={colors.lynch}
            label="Question"
            value={`${value.q}`}
            onChangeText={q => setValue({ ...value, q })}
            theme={{
              colors: { primary: colors.lynch, background: 'white' },
            }}
          />
          <View style={{ paddingVertical: 16 }}>
            <Dropdown
              label="Type"
              options={questionTypes}
              onSelect={(type: string) =>
                setValue({ ...value, type: type as ReviewQuestionType })
              }
              selectedValue={value.type}
            />
          </View>
          <List.Item
            style={styles.item}
            title="Required"
            right={() => (
              <Switch
                value={value.required}
                onValueChange={required =>
                  setValue({
                    ...value,
                    required,
                  })
                }
              />
            )}
          />
          {shouldRenderList ? (
            <View style={styles.listContainer}>
              <View style={styles.questionInputContainer}>
                <TextInput
                  testID="option_text_input"
                  style={styles.questionInput}
                  mode="outlined"
                  selectionColor={colors.lynch}
                  label="Add an option"
                  value={option}
                  onChangeText={op => setOption(op)}
                  onSubmitEditing={onAddOption}
                  theme={{
                    colors: { primary: colors.lynch, background: 'white' },
                  }}
                />
                <FAB
                  small
                  testID="add_question_button"
                  icon="plus"
                  disabled={!option}
                  onPress={onAddOption}
                />
              </View>
              <DraggableFlatList
                contentContainerStyle={{ paddingBottom: 100 }}
                testID="question_option_list"
                data={value.options || []}
                renderItem={OptionComponent}
                keyExtractor={(item, index) => `draggable-item-${index}`}
                onDragEnd={({ data }) => setValue({ ...value, options: data })}
              />
            </View>
          ) : (
            <View style={styles.listContainer} />
          )}
        </View>
      </ScrollView>
      <FAB
        testID="save_question_button"
        style={styles.fab}
        icon="check"
        onPress={onSave}
      />
    </ScreenContainer>
  );
}

export default QuestionEditScreen;
