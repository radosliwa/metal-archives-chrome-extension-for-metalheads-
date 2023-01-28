const OptionValue = {
  BAND: 'band_name',
  ALBUM: 'album_title',
} as const

const CategoryCopy = {
  BAND: 'Band',
  ALBUM: 'Album',
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