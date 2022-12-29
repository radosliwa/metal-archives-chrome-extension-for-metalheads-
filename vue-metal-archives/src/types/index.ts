enum OptionValue {
  BAND = 'band_name',
  ALBUM = 'album_title',
}
  
enum CategoryCopy {
  BAND = 'Band',
  ALBUM = 'Album',
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

  
export { OptionValue, CategoryCopy, TOptionValue, TCategoryCopy, IFormData, IActiveCategory }