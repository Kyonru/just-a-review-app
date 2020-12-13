import {
  TopType,
  AvartarStyle,
  AccessoriesType,
  HairColor,
  FacialHairType,
  FacialHairColor,
  ClotheType,
  ClotheColor,
  GraphicType,
  EyeType,
  EyebrowType,
  MouthType,
  SkinColor,
  HatColor,
} from 'src/utils/avatar';

export const topTypes = [
  { label: 'Turban', value: TopType.Turban, id: 0 },
  { label: 'WinterHat1', value: TopType.WinterHat1, id: 1 },
  { label: 'WinterHat2', value: TopType.WinterHat2, id: 2 },
  { label: 'WinterHat3', value: TopType.WinterHat3, id: 3 },
  { label: 'WinterHat4', value: TopType.WinterHat4, id: 4 },
  { label: 'LongHairBigHair', value: TopType.LongHairBigHair, id: 5 },
  { label: 'LongHairBob', value: TopType.LongHairBob, id: 6 },
  { label: 'LongHairBun', value: TopType.LongHairBun, id: 7 },
  { label: 'LongHairCurly', value: TopType.LongHairCurly, id: 8 },
  { label: 'LongHairCurvy', value: TopType.LongHairCurvy, id: 9 },
  { label: 'LongHairDreads', value: TopType.LongHairDreads, id: 10 },
  { label: 'LongHairFrida', value: TopType.LongHairFrida, id: 11 },
  { label: 'LongHairFro', value: TopType.LongHairFro, id: 12 },
  { label: 'LongHairFroBand', value: TopType.LongHairFroBand, id: 13 },
  { label: 'LongHairNotTooLong', value: TopType.LongHairNotTooLong, id: 14 },
  { label: 'LongHairShavedSides', value: TopType.LongHairShavedSides, id: 15 },
  { label: 'LongHairMiaWallace', value: TopType.LongHairMiaWallace, id: 16 },
  { label: 'LongHairStraight', value: TopType.LongHairStraight, id: 17 },
  { label: 'LongHairStraight2', value: TopType.LongHairStraight2, id: 18 },
  {
    label: 'LongHairStraightStrand',
    value: TopType.LongHairStraightStrand,
    id: 19,
  },
  { label: 'ShortHairDreads01', value: TopType.ShortHairDreads01, id: 20 },
  { label: 'ShortHairDreads02', value: TopType.ShortHairDreads02, id: 21 },
  { label: 'ShortHairFrizzle', value: TopType.ShortHairFrizzle, id: 22 },
  {
    label: 'ShortHairShaggyMullet',
    value: TopType.ShortHairShaggyMullet,
    id: 23,
  },
  { label: 'ShortHairShortCurly', value: TopType.ShortHairShortCurly, id: 24 },
  { label: 'ShortHairShortFlat', value: TopType.ShortHairShortFlat, id: 25 },
  { label: 'ShortHairShortRound', value: TopType.ShortHairShortRound, id: 26 },
  { label: 'ShortHairShortWaved', value: TopType.ShortHairShortWaved, id: 27 },
  { label: 'ShortHairSides', value: TopType.ShortHairSides, id: 28 },
  { label: 'ShortHairTheCaesar', value: TopType.ShortHairTheCaesar, id: 29 },
  {
    label: 'ShortHairTheCaesarSidePart',
    value: TopType.ShortHairTheCaesarSidePart,
    id: 30,
  },
];

export const avatarStyle = [
  { label: 'Circle', value: AvartarStyle.Circle, id: 0 },
  { label: 'Transparent', value: AvartarStyle.Transparent, id: 1 },
];

export const accessoriesTypes = [
  { label: 'Blank', value: AccessoriesType.Blank, id: 0 },
  { label: 'Kurt', value: AccessoriesType.Kurt, id: 1 },
  {
    label: 'Prescription01',
    value: AccessoriesType.Prescription01,
    id: 2,
  },
  {
    label: 'Prescription02',
    value: AccessoriesType.Prescription02,
    id: 3,
  },
  { label: 'Round', value: AccessoriesType.Round, id: 4 },
  { label: 'Sunglasses', value: AccessoriesType.Sunglasses, id: 5 },
  { label: 'Wayfarers', value: AccessoriesType.Wayfarers, id: 6 },
];

export const hairColors = [
  { label: 'Auburn', value: HairColor.Auburn, id: 0 },
  { label: 'Black', value: HairColor.Black, id: 1 },
  { label: 'Blonde', value: HairColor.Blonde, id: 2 },
  { label: 'BlondeGolden', value: HairColor.BlondeGolden, id: 3 },
  { label: 'Brown', value: HairColor.Brown, id: 4 },
  { label: 'BrownDark', value: HairColor.BrownDark, id: 5 },
  { label: 'PastelPink', value: HairColor.PastelPink, id: 6 },
  { label: 'Platinum', value: HairColor.Platinum, id: 7 },
  { label: 'Red', value: HairColor.Red, id: 8 },
  { label: 'SilverGray', value: HairColor.SilverGray, id: 9 },
];

export const facialHairTypes = [
  { label: 'Blank', value: FacialHairType.Blank, id: 0 },
  { label: 'BeardMedium', value: FacialHairType.BeardMedium, id: 1 },
  { label: 'BeardLight', value: FacialHairType.BeardLight, id: 2 },
  { label: 'BeardMagestic', value: FacialHairType.BeardMagestic, id: 3 },
  { label: 'MoustacheFancy', value: FacialHairType.MoustacheFancy, id: 4 },
  { label: 'MoustacheMagnum', value: FacialHairType.MoustacheMagnum, id: 5 },
];

export const facialHairColors = [
  { label: 'Auburn', value: FacialHairColor.Auburn, id: 0 },
  { label: 'Black', value: FacialHairColor.Black, id: 1 },
  { label: 'Blonde', value: FacialHairColor.Blonde, id: 2 },
  { label: 'BlondeGolden', value: FacialHairColor.BlondeGolden, id: 3 },
  { label: 'Brown', value: FacialHairColor.Brown, id: 4 },
  { label: 'BrownDark', value: FacialHairColor.BrownDark, id: 5 },
  { label: 'Platinum', value: FacialHairColor.Platinum, id: 6 },
  { label: 'Red', value: FacialHairColor.Red, id: 7 },
];

export const clotheTypes = [
  { label: 'BlazerShirt', value: ClotheType.BlazerShirt, id: 0 },
  { label: 'BlazerSweater', value: ClotheType.BlazerSweater, id: 1 },
  { label: 'CollarSweater', value: ClotheType.CollarSweater, id: 2 },
  { label: 'GraphicShirt', value: ClotheType.GraphicShirt, id: 3 },
  { label: 'Hoodie', value: ClotheType.Hoodie, id: 4 },
  { label: 'Overall', value: ClotheType.Overall, id: 5 },
  { label: 'ShirtCrewNeck', value: ClotheType.ShirtCrewNeck, id: 6 },
  { label: 'ShirtScoopNeck', value: ClotheType.ShirtScoopNeck, id: 7 },
  { label: 'ShirtVNeck', value: ClotheType.ShirtVNeck, id: 7 },
];

export const clotheColors = [
  { label: 'Black', value: ClotheColor.Black, id: 0 },
  { label: 'Blue01', value: ClotheColor.Blue01, id: 1 },
  { label: 'Blue02', value: ClotheColor.Blue02, id: 2 },
  { label: 'Blue03', value: ClotheColor.Blue03, id: 3 },
  { label: 'Gray01', value: ClotheColor.Gray01, id: 4 },
  { label: 'Gray02', value: ClotheColor.Gray02, id: 5 },
  { label: 'Heather', value: ClotheColor.Heather, id: 6 },
  { label: 'PastelBlue', value: ClotheColor.PastelBlue, id: 7 },
  { label: 'PastelGreen', value: ClotheColor.PastelGreen, id: 8 },
  { label: 'PastelOrange', value: ClotheColor.PastelOrange, id: 9 },
  { label: 'PastelRed', value: ClotheColor.PastelRed, id: 10 },
  { label: 'PastelYellow', value: ClotheColor.PastelYellow, id: 11 },
  { label: 'Pink', value: ClotheColor.Pink, id: 12 },
  { label: 'Red', value: ClotheColor.Red, id: 13 },
  { label: 'White', value: ClotheColor.White, id: 14 },
];

export const graphicTypes = [
  { label: 'Bat', value: GraphicType.Bat, id: 0 },
  { label: 'Cumbia', value: GraphicType.Cumbia, id: 1 },
  { label: 'Deer', value: GraphicType.Deer, id: 2 },
  { label: 'Diamond', value: GraphicType.Diamond, id: 3 },
  { label: 'Hola', value: GraphicType.Hola, id: 4 },
  { label: 'Pizza', value: GraphicType.Pizza, id: 5 },
  { label: 'Resist', value: GraphicType.Resist, id: 6 },
  { label: 'Selena', value: GraphicType.Selena, id: 7 },
  { label: 'Bear', value: GraphicType.Bear, id: 8 },
  { label: 'SkullOutline', value: GraphicType.SkullOutline, id: 9 },
  { label: 'Skull', value: GraphicType.Skull, id: 10 },
];

export const eyeTypes = [
  { label: 'Close', value: EyeType.Close, id: 0 },
  { label: 'Cry', value: EyeType.Cry, id: 1 },
  { label: 'Default', value: EyeType.Default, id: 2 },
  { label: 'Dizzy', value: EyeType.Dizzy, id: 3 },
  { label: 'EyeRoll', value: EyeType.EyeRoll, id: 4 },
  { label: 'Happy', value: EyeType.Happy, id: 5 },
  { label: 'Hearts', value: EyeType.Hearts, id: 6 },
  { label: 'Side', value: EyeType.Side, id: 7 },
  { label: 'Squint', value: EyeType.Squint, id: 8 },
  { label: 'Surprised', value: EyeType.Surprised, id: 9 },
  { label: 'Wink', value: EyeType.Wink, id: 10 },
  { label: 'WinkWacky', value: EyeType.WinkWacky, id: 11 },
];

export const eyebrowTypes = [
  { label: 'Angry', value: EyebrowType.Angry, id: 0 },
  { label: 'AngryNatural', value: EyebrowType.AngryNatural, id: 1 },
  { label: 'Default', value: EyebrowType.Default, id: 2 },
  { label: 'DefaultNatural', value: EyebrowType.DefaultNatural, id: 3 },
  { label: 'FlatNatural', value: EyebrowType.FlatNatural, id: 4 },
  { label: 'RaisedExcited', value: EyebrowType.RaisedExcited, id: 5 },
  {
    label: 'RaisedExcitedNatural',
    value: EyebrowType.RaisedExcitedNatural,
    id: 6,
  },
  { label: 'SadConcerned', value: EyebrowType.SadConcerned, id: 7 },
  {
    label: 'SadConcernedNatural',
    value: EyebrowType.SadConcernedNatural,
    id: 8,
  },
  { label: 'UnibrowNatural', value: EyebrowType.UnibrowNatural, id: 9 },
  { label: 'UpDown', value: EyebrowType.UpDown, id: 10 },
  { label: 'UpDownNatural', value: EyebrowType.UpDownNatural, id: 11 },
];

export const mouthTypes = [
  { label: 'Concerned', value: MouthType.Concerned, id: 0 },
  { label: 'Default', value: MouthType.Default, id: 1 },
  { label: 'Disbelief', value: MouthType.Disbelief, id: 2 },
  { label: 'Eating', value: MouthType.Eating, id: 3 },
  { label: 'Grimace', value: MouthType.Grimace, id: 4 },
  { label: 'Sad', value: MouthType.Sad, id: 5 },
  { label: 'ScreamOpen', value: MouthType.ScreamOpen, id: 6 },
  { label: 'Serious', value: MouthType.Serious, id: 7 },
  { label: 'Smile', value: MouthType.Smile, id: 8 },
  { label: 'Tongue', value: MouthType.Tongue, id: 9 },
  { label: 'Twinkle', value: MouthType.Twinkle, id: 10 },
  { label: 'Vomit', value: MouthType.Vomit, id: 11 },
];

export const skinColors = [
  { label: 'Tanned', value: SkinColor.Tanned, id: 0 },
  { label: 'Yellow', value: SkinColor.Yellow, id: 1 },
  { label: 'Pale', value: SkinColor.Pale, id: 2 },
  { label: 'Light', value: SkinColor.Light, id: 3 },
  { label: 'Brown', value: SkinColor.Brown, id: 4 },
  { label: 'DarkBrown', value: SkinColor.DarkBrown, id: 5 },
  { label: 'Black', value: SkinColor.Black, id: 6 },
];

export const hatColors = [
  { label: 'Black', value: HatColor.Black, id: 0 },
  { label: 'Blue01', value: HatColor.Blue01, id: 1 },
  { label: 'Blue02', value: HatColor.Blue02, id: 2 },
  { label: 'Blue03', value: HatColor.Blue03, id: 3 },
  { label: 'Gray01', value: HatColor.Gray01, id: 4 },
  { label: 'Gray02', value: HatColor.Gray02, id: 5 },
  { label: 'Heather', value: HatColor.Heather, id: 6 },
  { label: 'PastelBlue', value: HatColor.PastelBlue, id: 7 },
  { label: 'PastelGreen', value: HatColor.PastelGreen, id: 8 },
  { label: 'PastelOrange', value: HatColor.PastelOrange, id: 9 },
  { label: 'PastelRed', value: HatColor.PastelRed, id: 10 },
  { label: 'PastelYellow', value: HatColor.PastelYellow, id: 11 },
  { label: 'Pink', value: HatColor.Pink, id: 12 },
  { label: 'Red', value: HatColor.Red, id: 13 },
  { label: 'White', value: HatColor.White, id: 14 },
];
