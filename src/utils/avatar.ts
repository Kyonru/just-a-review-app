import queryString from 'query-string';
import { randomEnum } from './enums';

// ID: topType
export enum TopType {
  Turban = 'Turban',
  WinterHat1 = 'WinterHat1',
  WinterHat2 = 'WinterHat2',
  WinterHat3 = 'WinterHat3',
  WinterHat4 = 'WinterHat4',
  LongHairBigHair = 'LongHairBigHair',
  LongHairBob = 'LongHairBob',
  LongHairBun = 'LongHairBun',
  LongHairCurly = 'LongHairCurly',
  LongHairCurvy = 'LongHairCurvy',
  LongHairDreads = 'LongHairDreads',
  LongHairFrida = 'LongHairFrida',
  LongHairFro = 'LongHairFro',
  LongHairFroBand = 'LongHairFroBand',
  LongHairNotTooLong = 'LongHairNotTooLong',
  LongHairShavedSides = 'LongHairShavedSides',
  LongHairMiaWallace = 'LongHairMiaWallace',
  LongHairStraight = 'LongHairStraight',
  LongHairStraight2 = 'LongHairStraight2',
  LongHairStraightStrand = 'LongHairStraightStrand',
  ShortHairDreads01 = 'ShortHairDreads01',
  ShortHairDreads02 = 'ShortHairDreads02',
  ShortHairFrizzle = 'ShortHairFrizzle',
  ShortHairShaggyMullet = 'ShortHairShaggyMullet',
  ShortHairShortCurly = 'ShortHairShortCurly',
  ShortHairShortFlat = 'ShortHairShortFlat',
  ShortHairShortRound = 'ShortHairShortRound',
  ShortHairShortWaved = 'ShortHairShortWaved',
  ShortHairSides = 'ShortHairSides',
  ShortHairTheCaesar = 'ShortHairTheCaesar',
  ShortHairTheCaesarSidePart = 'ShortHairTheCaesarSidePart',
}

// ID: avatarStyle
export enum AvartarStyle {
  Circle = 'Circle',
  Transparent = 'Transparent',
}

// ID: accessoriesType
export enum AccessoriesType {
  Blank = 'Blank',
  Kurt = 'Kurt',
  Prescription01 = 'Prescription01',
  Prescription02 = 'Prescription02',
  Round = 'Round',
  Sunglasses = 'Sunglasses',
  Wayfarers = 'Wayfarers',
}

// ID: hairColor
export enum HairColor {
  Auburn = 'Auburn',
  Black = 'Black',
  Blonde = 'Blonde',
  BlondeGolden = 'BlondeGolden',
  Brown = 'Brown',
  BrownDark = 'BrownDark',
  PastelPink = 'PastelPink',
  Platinum = 'Platinum',
  Red = 'Red',
  SilverGray = 'SilverGray',
}

// ID: facialHairType
export enum FacialHairType {
  Blank = 'Blank',
  BeardMedium = 'BeardMedium',
  BeardLight = 'BeardLight',
  BeardMagestic = 'BeardMagestic',
  MoustacheFancy = 'MoustacheFancy',
  MoustacheMagnum = 'MoustacheMagnum',
}

// ID: facialHairColor
export enum FacialHairColor {
  Auburn = 'Auburn',
  Black = 'Black',
  Blonde = 'Blonde',
  BlondeGolden = 'BlondeGolden',
  Brown = 'Brown',
  BrownDark = 'BrownDark',
  Platinum = 'Platinum',
  Red = 'Red',
}

// ID: clotheType
export enum ClotheType {
  BlazerShirt = 'BlazerShirt',
  BlazerSweater = 'BlazerSweater',
  CollarSweater = 'CollarSweater',
  GraphicShirt = 'GraphicShirt',
  Hoodie = 'Hoodie',
  Overall = 'Overall',
  ShirtCrewNeck = 'ShirtCrewNeck',
  ShirtScoopNeck = 'ShirtScoopNeck',
  ShirtVNeck = 'ShirtVNeck',
}

// ID: clotheColor
export enum ClotheColor {
  Black = 'Black',
  Blue01 = 'Blue01',
  Blue02 = 'Blue02',
  Blue03 = 'Blue03',
  Gray01 = 'Gray01',
  Gray02 = 'Gray02',
  Heather = 'Heather',
  PastelBlue = 'PastelBlue',
  PastelGreen = 'PastelGreen',
  PastelOrange = 'PastelOrange',
  PastelRed = 'PastelRed',
  PastelYellow = 'PastelYellow',
  Pink = 'Pink',
  Red = 'Red',
  White = 'White',
}

// ID: graphicType
export enum GraphicType {
  Bat = 'Bat',
  Cumbia = 'Cumbia',
  Deer = 'Deer',
  Diamond = 'Diamond',
  Hola = 'Hola',
  Pizza = 'Pizza',
  Resist = 'Resist',
  Selena = 'Selena',
  Bear = 'Bear',
  SkullOutline = 'SkullOutline',
  Skull = 'Skull',
}

// ID: eyeType
export enum EyeType {
  Close = 'Close',
  Cry = 'Cry',
  Default = 'Default',
  Dizzy = 'Dizzy',
  EyeRoll = 'EyeRoll',
  Happy = 'Happy',
  Hearts = 'Hearts',
  Side = 'Side',
  Squint = 'Squint',
  Surprised = 'Surprised',
  Wink = 'Wink',
  WinkWacky = 'WinkWacky',
}

// ID: eyebrowType
export enum EyebrowType {
  Angry = 'Angry',
  AngryNatural = 'AngryNatural',
  Default = 'Default',
  DefaultNatural = 'DefaultNatural',
  FlatNatural = 'FlatNatural',
  RaisedExcited = 'RaisedExcited',
  RaisedExcitedNatural = 'RaisedExcitedNatural',
  SadConcerned = 'SadConcerned',
  SadConcernedNatural = 'SadConcernedNatural',
  UnibrowNatural = 'UnibrowNatural',
  UpDown = 'UpDown',
  UpDownNatural = 'UpDownNatural',
}

// ID: mouthType
export enum MouthType {
  Concerned = 'Concerned',
  Default = 'Default',
  Disbelief = 'Disbelief',
  Eating = 'Eating',
  Grimace = 'Grimace',
  Sad = 'Sad',
  ScreamOpen = 'ScreamOpen',
  Serious = 'Serious',
  Smile = 'Smile',
  Tongue = 'Tongue',
  Twinkle = 'Twinkle',
  Vomit = 'Vomit',
}

// ID: skinColor
export enum SkinColor {
  Tanned = 'Tanned',
  Yellow = 'Yellow',
  Pale = 'Pale',
  Light = 'Light',
  Brown = 'Brown',
  DarkBrown = 'DarkBrown',
  Black = 'Black',
}

// ID: hatColor
export enum HatColor {
  Black = 'Black',
  Blue01 = 'Blue01',
  Blue02 = 'Blue02',
  Blue03 = 'Blue03',
  Gray01 = 'Gray01',
  Gray02 = 'Gray02',
  Heather = 'Heather',
  PastelBlue = 'PastelBlue',
  PastelGreen = 'PastelGreen',
  PastelOrange = 'PastelOrange',
  PastelRed = 'PastelRed',
  PastelYellow = 'PastelYellow',
  Pink = 'Pink',
  Red = 'Red',
  White = 'White',
}

export enum AvatarProps {
  topType = 'topType',
  avatarStyle = 'avatarStyle',
  accessoriesType = 'accessoriesType',
  hairColor = 'hairColor',
  facialHairType = 'facialHairType',
  facialHairColor = 'facialHairColor',
  clotheType = 'clotheType',
  clotheColor = 'clotheColor',
  graphicType = 'graphicType',
  eyeType = 'eyeType',
  eyebrowType = 'eyebrowType',
  mouthType = 'mouthType',
  skinColor = 'skinColor',
  hatColor = 'hatColor',
}

const BASE_URL = 'https://avataaars.io/?';

export const createAvatar = (props: { [key: string]: string }) => {
  return `${BASE_URL}${queryString.stringify(props)}`;
};

export const createRandomAvatar = () => {
  return createAvatar({
    [AvatarProps.topType]: randomEnum(TopType),
    [AvatarProps.avatarStyle]: AvartarStyle.Circle,
    [AvatarProps.accessoriesType]: randomEnum(AccessoriesType),
    [AvatarProps.hairColor]: randomEnum(HairColor),
    [AvatarProps.facialHairType]: randomEnum(FacialHairType),
    [AvatarProps.facialHairColor]: randomEnum(FacialHairColor),
    [AvatarProps.clotheType]: randomEnum(ClotheColor),
    [AvatarProps.clotheColor]: randomEnum(ClotheType),
    [AvatarProps.graphicType]: randomEnum(GraphicType),
    [AvatarProps.eyeType]: randomEnum(EyeType),
    [AvatarProps.eyebrowType]: randomEnum(EyebrowType),
    [AvatarProps.mouthType]: randomEnum(MouthType),
    [AvatarProps.skinColor]: randomEnum(SkinColor),
    [AvatarProps.hatColor]: randomEnum(HatColor),
  });
};

export const getAvatarProperties = (url?: string) => {
  const search = (url || createRandomAvatar()).split('?');
  return queryString.parse(search[1]);
};
