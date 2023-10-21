// <option value="band_name">Band name</option>
// <option value="album_title">Album title</option>
// <option value="song_title">Song title</option>
// <option value="label_name">Label</option>
// <option value="artist_alias">Artist</option>

const OptionValue = {
  BAND: 'band_name',
  ALBUM: 'album_title',
  SONG: 'song_title',
  LABEL: 'label_name',
  ARTIST: 'artist_alias',
} as const

const CategoryCopy = {
  BAND: 'Band',
  ALBUM: 'Album',
  SONG: 'Song title',
  LABEL: 'Label',
  ARTIST: 'Artist alias',
} as const

enum ErrorMsg {
  INPUT = 'Input is required!',
  CATEGORY = 'Category is required!',
}

type TOptionValue = typeof OptionValue[keyof typeof OptionValue] | '';

type TCategoryCopy = typeof CategoryCopy[keyof typeof CategoryCopy] | '';

interface IFormData {
  category: TOptionValue;
  input: string;
}
interface IActiveCategory {
  optionValue: TOptionValue;
  copy: TCategoryCopy;
}


export { OptionValue, ErrorMsg, CategoryCopy, TOptionValue, TCategoryCopy, IFormData, IActiveCategory }