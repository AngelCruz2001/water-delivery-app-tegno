import {FieldErrors, FieldValues} from 'react-hook-form';

export const getInputError = (
  errors: FieldErrors<FieldValues>,
  name: string,
) => {
  return errors[name]?.message || '';
};
