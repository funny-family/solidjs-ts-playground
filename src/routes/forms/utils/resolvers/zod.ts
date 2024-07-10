import { type Schema } from 'zod';

export var rodResolver = <TSchema extends Schema<any, any>>(
  schema: TSchema
) => {
  console.log('zod schema:', schema);

  return {
    //
  };
};
