import { createFormData, isNameValid, isEmailValid } from "./formValidation";

export const updateUserSubmitHandler = (
  e,
  fullname,
  name,
  email,
  role,
  alert,
  userId,
  dispatch,
  updateUser
) => {
  e.preventDefault();

  const isName = isNameValid(name, 2, 32);

  const isEmail = isEmailValid(email);

  const isFullName = isNameValid(fullname, 2, 32);

  if (!isName) {
    return alert.error(
      "Name Should Contain Atleast 2 Characters And Must Be Valid"
    );
  } else if (!isFullName) {
    return alert.error(
      "Full Name Should Contain Atleast 2 Characters And Must Be Valid"
    );
  } else if (!isEmail) {
    return alert.error("Invalid Email");
  } else {
    const user = {
      name: name,
      email: email,
      role: role,
      fullname: fullname,
    };

    const myForm = createFormData(user);

    dispatch(updateUser(userId, myForm));
  }
};
