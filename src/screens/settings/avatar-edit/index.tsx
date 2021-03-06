import React from 'react';
import { View, ScrollView } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';

import ScreenContainer from 'src/components/screen-container';
import Dropdown from 'src/components/dropdown';
import { settingsStoreSelector } from 'src/store/selectors';
import {
  accessoriesTypes,
  topTypes,
  avatarStyle,
  hairColors,
  facialHairTypes,
  facialHairColors,
  clotheTypes,
  clotheColors,
  graphicTypes,
  eyeTypes,
  eyebrowTypes,
  mouthTypes,
  skinColors,
  hatColors,
} from 'src/data/avatar';
import settingsSlice from 'src/store/settings/reducer';
import {
  AvatarProps as AvatarProperties,
  getAvatarProperties,
  createAvatar,
} from 'src/utils/avatar';
import { LocalizationContext } from 'src/services/i18n';

import styles from './styles';

function PropertyDropdown({
  label,
  dispatch,
  avatar,
  options,
  selectedValue,
}: {
  label: string;
  dispatch: any;
  avatar: any;
  options: any[];
  selectedValue: string;
}) {
  return (
    <View key={label} style={{ paddingVertical: 8 }}>
      <Dropdown
        label={label}
        options={options}
        onSelect={(value: string) =>
          dispatch(
            settingsSlice.actions.updateUserInfo({
              image: createAvatar({
                ...avatar,
                [selectedValue]: value,
              }),
            }),
          )
        }
        selectedValue={avatar[selectedValue]}
      />
    </View>
  );
}

function AvatarProps() {
  const dispatch = useDispatch();
  const { user } = useSelector(settingsStoreSelector);
  const avatarProps = getAvatarProperties(user.image);

  const { translate, strings } = React.useContext(LocalizationContext);
  return (
    <ScreenContainer
      containerProps={{ testID: 'avatar_edit_screen' }}
      containerStyle={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <View>
            <View style={styles.header}>
              <SvgUri width={140} height={140} uri={user.image} />
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.avatarStyle)}
                options={avatarStyle}
                dispatch={dispatch}
                selectedValue={AvatarProperties.avatarStyle}
              />
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.topType)}
                options={topTypes}
                dispatch={dispatch}
                selectedValue={AvatarProperties.topType}
              />
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.accessories)}
                options={accessoriesTypes}
                dispatch={dispatch}
                selectedValue={AvatarProperties.accessoriesType}
              />
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.hairColor)}
                options={hairColors}
                dispatch={dispatch}
                selectedValue={AvatarProperties.hairColor}
              />
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.facialHairType)}
                options={facialHairTypes}
                dispatch={dispatch}
                selectedValue={AvatarProperties.facialHairType}
              />
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.facialHairColor)}
                options={facialHairColors}
                dispatch={dispatch}
                selectedValue={AvatarProperties.facialHairColor}
              />
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.clotheType)}
                options={clotheTypes}
                dispatch={dispatch}
                selectedValue={AvatarProperties.clotheType}
              />
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.clotheColor)}
                options={clotheColors}
                dispatch={dispatch}
                selectedValue={AvatarProperties.clotheColor}
              />
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.clotheGraphic)}
                options={graphicTypes}
                dispatch={dispatch}
                selectedValue={AvatarProperties.graphicType}
              />
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.eyeType)}
                options={eyeTypes}
                dispatch={dispatch}
                selectedValue={AvatarProperties.eyeType}
              />
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.eyebrowType)}
                options={eyebrowTypes}
                dispatch={dispatch}
                selectedValue={AvatarProperties.eyebrowType}
              />
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.mouthType)}
                options={mouthTypes}
                dispatch={dispatch}
                selectedValue={AvatarProperties.mouthType}
              />
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.skinColor)}
                options={skinColors}
                dispatch={dispatch}
                selectedValue={AvatarProperties.skinColor}
              />
              <PropertyDropdown
                avatar={avatarProps}
                label={translate(strings.hatColor)}
                options={hatColors}
                dispatch={dispatch}
                selectedValue={AvatarProperties.hatColor}
              />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

export default AvatarProps;
