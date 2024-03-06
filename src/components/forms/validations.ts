import { FieldValues, FormState, RegisterOptions } from "react-hook-form";

const userNameValidations: RegisterOptions = {
  required: {
    value: true,
    message: "Username is required.",
  },
  minLength: {
    value: 4,
    message: "Username must be at least three characters.",
  },
};

const passwordValidations: RegisterOptions = {
  required: {
    value: true,
    message: "Password is required.",
  },
  minLength: {
    value: 6,
    message: "Password must be at least six characters.",
  },
};

const confirmPasswordValidations: RegisterOptions = {
  required: {
    value: true,
    message: "Confirm Password is required.",
  },
  minLength: {
    value: 6,
    message: "Confirm Password must be at least six characters.",
  }
};

function hasFailedValidation<
  T extends Record<string, string | boolean | number>
>(
  formState: FormState<FieldValues>,
  fieldName: keyof T,
  onFail?: (status: boolean) => string
) {
  const { isSubmitted, dirtyFields, touchedFields, errors } = formState;
  const validationStatus =
    (isSubmitted ||
      dirtyFields[fieldName] ||
      touchedFields[fieldName as string]) &&
    errors[fieldName as string];

  if (onFail) {
    return onFail(validationStatus);
  }

  return validationStatus;
}

export { userNameValidations, passwordValidations, hasFailedValidation, confirmPasswordValidations };
