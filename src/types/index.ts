const OptionValue = {
  BAND: 'band_name',
  ALBUM: 'album_title',
  SONG: 'song_title',
  LABEL: 'label_name',
  ARTIST: 'artist_alias',
} as const

const CategoryCopy = {
  [OptionValue.BAND]: 'Band',
  [OptionValue.ALBUM]: 'Album',
  [OptionValue.SONG]: 'Song title',
  [OptionValue.LABEL]: 'Label',
  [OptionValue.ARTIST]: 'Artist alias',
} as const

enum ErrorMsg {
  INPUT = 'Input is required!',
  CATEGORY = 'Category is required!',
}

type TOptionValue = typeof OptionValue[keyof typeof OptionValue] | '';
type TCategoryCopy = typeof CategoryCopy[keyof typeof CategoryCopy];
interface IFormData {
  category: TOptionValue;
  input: string;
}


export { CategoryCopy, ErrorMsg, IFormData, OptionValue, TCategoryCopy, TOptionValue }