/** @jsxImportSource @emotion/react */

import { Checkbox, Input } from "antd";
import {
  Form,
  FormActions,
  FormError,
  FormGroup,
  AppButton,
} from "./forms/lib";
import TogglePassword from "./lib/TogglePassword";
import { RegisterFormProps, RegisterFormType } from "./forms/models";
import { Controller, FieldValues, useForm } from "react-hook-form";
import {
  confirmPasswordValidations,
  hasFailedValidation,
  passwordValidations,
  userNameValidations,
} from "./forms/validations";
import { useAsync } from "../hooks/use-async";
import { ErrorAlert } from "./lib/ErrorAlert";
import { InlineSpinner } from "./lib/InlineSpin";

function RegisterForm({ onSubmit }: RegisterFormProps) {
  const { isError, isLoading, error, run } = useAsync<void>();
  const { handleSubmit, getFieldState, formState, control, watch } =
    useForm<RegisterFormType>({
      mode: "all",
    });

  const usernameState = getFieldState("username", formState);
  const passwordState = getFieldState("password", formState);
  const confirmPasswordState = getFieldState("confirm-password", formState);
  const termsOfUseState = getFieldState("termsOfUse", formState);

  const onRegister = (data: FieldValues) => {
    run(
      onSubmit({
        username: data.username,
        password: data.password,
        "confirm-password": data["confirm-password"],
        termsOfUse: data.termsOfUse,
      })
    );
  };

  return (
    <Form onSubmit={handleSubmit(onRegister)}>
      {isError && error ? <ErrorAlert error={error} /> : null}

      <FormGroup>
        <label htmlFor="username">Username</label>

        <Controller
          name="username"
          control={control}
          rules={userNameValidations}
          render={({ formState: localFormState, field }) => (
            <Input
              type="text"
              id="username"
              placeholder="Enter here..."
              autoComplete="username"
              {...field}
              status={hasFailedValidation<RegisterFormType>(
                localFormState,
                "username",
                (status) => (status ? "error" : "")
              )}
            />
          )}
        />

        {hasFailedValidation<RegisterFormType>(formState, "username") ? (
          <FormError>{usernameState.error?.message}</FormError>
        ) : null}
      </FormGroup>

      <FormGroup>
        <label htmlFor="password">Password</label>

        <Controller
          name="password"
          control={control}
          rules={{ ...passwordValidations, deps: ["confirm-password"] }}
          render={({ formState: localFormState, field }) => (
            <Input.Password
              id="password"
              autoComplete="new-password"
              placeholder="Enter here..."
              iconRender={TogglePassword}
              {...field}
              status={hasFailedValidation<RegisterFormType>(
                localFormState,
                "password",
                (status) => (status ? "error" : "")
              )}
            />
          )}
        />

        {hasFailedValidation<RegisterFormType>(formState, "password") ? (
          <FormError>{passwordState.error?.message}</FormError>
        ) : null}
      </FormGroup>

      <FormGroup>
        <label htmlFor="confirm-password">Confirm Password</label>

        <Controller
          name="confirm-password"
          control={control}
          rules={{
            ...confirmPasswordValidations,
            validate: {
              passwordMismatch: (value: string) => {
                return value == watch("password")
                  ? undefined
                  : "Confirm Password does not match";
              },
            },
          }}
          render={({ formState: localFormState, field }) => (
            <Input.Password
              id="confirm-password"
              autoComplete="new-password"
              placeholder="Enter here..."
              iconRender={TogglePassword}
              {...field}
              status={hasFailedValidation<RegisterFormType>(
                localFormState,
                "confirm-password",
                (status) => (status ? "error" : "")
              )}
            />
          )}
        />

        {hasFailedValidation<RegisterFormType>(
          formState,
          "confirm-password"
        ) ? (
          <FormError>{confirmPasswordState.error?.message}</FormError>
        ) : null}
      </FormGroup>

      <FormGroup>
        <Controller
          name="termsOfUse"
          control={control}
          rules={{
            required: "Please accept the Terms of use and Privacy Policy.",
          }}
          render={({ field: { value, ...fieldProps } }) => (
            <Checkbox css={{ color: "inherit" }} {...fieldProps}>
              <span css={{ color: "#ff4343" }}>*</span>I accept the{" "}
              <span css={{ color: "#f78166" }}>
                Terms of Use & Privacy Policy
              </span>
            </Checkbox>
          )}
        />

        {hasFailedValidation<RegisterFormType>(formState, "termsOfUse") ? (
          <FormError>{termsOfUseState.error?.message}</FormError>
        ) : null}
      </FormGroup>

      <FormActions>
        <AppButton
          type="primary"
          htmlType="submit"
          size="large"
          css={{ width: "100%", marginTop: "0.5rem" }}
        >
          Register Now
          {isLoading ? <InlineSpinner /> : null}
        </AppButton>
      </FormActions>
    </Form>
  );
}

export { RegisterForm };
