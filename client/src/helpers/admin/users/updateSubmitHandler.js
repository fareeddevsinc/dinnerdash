import { createFormData, isNameValid, isEmailValid } from "./formValidation";

export const updateUserSubmitHandler = (
  e,
  name,
  email,
  role,
  alert,
  userId,
  dispatch,
  updateUser
) => {
  e.preventDefault();

  const isName = isNameValid(name);

  const isEmail = isEmailValid(email);

  if (!isName) {
    return alert.error(
      "Name Should Contain Atleast 2 Characters And Must Be Valid"
    );
  } else if (!isEmail) {
    return alert.error("Invalid Email");
  } else {
    const user = {
      name: name,
      email: email,
      role: role,
    };

    const myForm = createFormData(user);

    dispatch(updateUser(userId, myForm));
  }
};
