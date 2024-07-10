import { type ObjectSchema, type lazy } from 'yup';

export var yupResolver = <
  TSchema extends
    | ObjectSchema<TFieldValue>
    | ReturnType<typeof lazy<ObjectSchema<TFieldValue>>>,
  TFieldValue extends Record<string, any> = Record<string, any>
>(
  schema: TSchema
) => {
  console.log('yup schema:', schema);

  return {
    //
  };
};
