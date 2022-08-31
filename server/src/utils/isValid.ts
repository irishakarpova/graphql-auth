import { validate, validateOrReject } from 'class-validator';
import { User } from '../entity/User';

export const isValid = async (email: string, password: string) => {
  let user = new User();
  user.email = email;
  user.password = password;

  const isValidEmail = await validate(user).then((errors) => {
    if (errors.length > 0) {
      throw new Error();
    } else {
      return true;
    }
  });

  await validateOrReject(user).catch((errors) => {
    throw new Error(errors);
  });

  return isValidEmail;
};
