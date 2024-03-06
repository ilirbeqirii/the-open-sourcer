/** @jsxImportSource @emotion/react */

import { Input } from "antd";
import {
  Form,
  FormActions,
  FormError,
  FormGroup,
  AppButton,
} from "./forms/lib";
import { useForm, Controller, FieldValues } from "react-hook-form";
import TogglePassword from "./lib/TogglePassword";
import { LoginFormProps, LoginFormType } from "./forms/models";
import {
  hasFailedValidation,
  passwordValidations,
  userNameValidations,
} from "./forms/validations";
import { useAsync } from "../hooks/use-async";
import { ErrorAlert } from "./lib/ErrorAlert";
import { InlineSpinner } from "./lib/InlineSpin";

function LoginForm({ onSubmit }: LoginFormProps) {
  const { isLoading, isError, run, error } = useAsync<void>();
  const { handleSubmit, getFieldState, formState, control } =
    useForm<LoginFormType>({
      mode: "all",
    });

  const usernameState = getFieldState("username", formState);
  const passwordState = getFieldState("password", formState);

  const onLogin = (data: FieldValues) => {
    run(
      onSubmit({
        username: data.username,
        password: data.password,
      })
    );
  };

  return (
    <Form onSubmit={handleSubmit(onLogin)}>
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
              status={hasFailedValidation<LoginFormType>(
                localFormState,
                "username",
                (status) => (status ? "error" : "")
              )}
            />
          )}
        />

        {hasFailedValidation<LoginFormType>(formState, "username") ? (
          <FormError>{usernameState.error?.message}</FormError>
        ) : null}
      </FormGroup>

      <FormGroup>
        <label htmlFor="password">Password</label>

        <Controller
          name="password"
          control={control}
          rules={passwordValidations}
          render={({ formState: localFormState, field }) => (
            <Input.Password
              id="password"
              placeholder="Enter here..."
              autoComplete="current-password"
              iconRender={TogglePassword}
              {...field}
              status={hasFailedValidation<LoginFormType>(
                localFormState,
                "password",
                (status) => (status ? "error" : "")
              )}
            />
          )}
        />

        {hasFailedValidation<LoginFormType>(formState, "password") ? (
          <FormError>{passwordState.error?.message}</FormError>
        ) : null}
      </FormGroup>

      <FormActions>
        <AppButton
          type="primary"
          htmlType="submit"
          size="large"
          css={{ width: "100%", marginTop: "0.5rem" }}
        >
          Log In
          {isLoading ? <InlineSpinner /> : null}
        </AppButton>
      </FormActions>
    </Form>
  );
}

export default LoginForm;
