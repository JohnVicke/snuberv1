import { UserInput } from 'src/resolvers/UserInput';

// TODO: Needs better validation. This is currently 'purely' for functionality testing
export const validateRegister = (options: UserInput) => {
  const { username, password, email } = options;
  if (username.length < 3) {
    return [
      {
        field: 'username',
        message: 'Lenght of username must be greater than 3'
      }
    ];
  }
  if (password.length < 3) {
    return [
      {
        field: 'password',
        message: 'Length of password must be greater than 3'
      }
    ];
  }
  if (!email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'invalid email'
      }
    ];
  }
  if (username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'username cant include @'
      }
    ];
  }
  return null;
};
