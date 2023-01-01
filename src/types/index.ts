enum OptionValue {
  BAND = 'band_name',
  ALBUM = 'album_title',
}

enum CategoryCopy {
  BAND = 'Band',
  ALBUM = 'Album',
}

enum ErrorMsg {
  INPUT = 'Input is required!',
  CATEGORY = 'Category is required!',
}

type TOptionValue = `${OptionValue}` | '';

type TCategoryCopy = `${CategoryCopy}` | '';

interface IFormData {
  category: TOptionValue;
  input: string;
}
interface IActiveCategory {
  optionValue: TOptionValue;
  copy: TCategoryCopy;
}



export { OptionValue, ErrorMsg, CategoryCopy, TOptionValue, TCategoryCopy, IFormData, IActiveCategory }