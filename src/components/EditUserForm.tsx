/** @jsxImportSource @emotion/react */

import { Controller, FieldValues, useForm } from "react-hook-form";
import {
  AppButton,
  Form,
  FormActions,
  FormError,
  FormGroup,
  FormLabel,
} from "./forms/lib";
import { Input, Space } from "antd";
import { hasFailedValidation } from "./forms/validations";
import { EditUserFormFields } from "./forms/models";
import { UserInfo } from "../api/models/user";

type EditUserFormProps = {
  userInfo: UserInfo;
  handleCancelFn: () => void;
  handleUpdateFn: (data: EditUserFormFields) => void;
};

function EditUserForm({
  userInfo,
  handleCancelFn,
  handleUpdateFn,
}: EditUserFormProps) {
  const { handleSubmit, getFieldState, formState, control, reset } =
    useForm<EditUserFormFields>({
      mode: "all",
      defaultValues: {
        firstname: userInfo?.firstname,
        lastname: userInfo?.lastname,
        age: userInfo?.age,
        phone: userInfo?.phone,
        location: userInfo?.location,
        address: userInfo?.address,
      },
    });

  const firstNameState = getFieldState("firstname", formState);
  const lastNameState = getFieldState("lastname", formState);
  const phoneState = getFieldState("phone", formState);
  const ageState = getFieldState("age", formState);
  const locationState = getFieldState("location", formState);

  const handleCancel = () => {
    handleCancelFn();

    reset();
  };

  const onUpdate = (data: FieldValues) => {
    handleUpdateFn(data as EditUserFormFields);
  };

  return (
    <Form onSubmit={handleSubmit(onUpdate)}>
      <Space styles={{ item: { flex: 1 } }}>
        <FormGroup>
          <FormLabel htmlFor="firstname">First Name*</FormLabel>

          <Controller
            name="firstname"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Firstname is required",
              },
            }}
            render={({ formState: localFormState, field }) => (
              <Input
                type="text"
                id="firstname"
                placeholder="Enter here..."
                {...field}
                status={hasFailedValidation<EditUserFormFields>(
                  localFormState,
                  "firstname",
                  (status) => (status ? "error" : "")
                )}
              />
            )}
          />

          {hasFailedValidation<EditUserFormFields>(formState, "firstname") ? (
            <FormError>{firstNameState.error?.message}</FormError>
          ) : null}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="lastname">Last Name*</FormLabel>

          <Controller
            name="lastname"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Lastname is required",
              },
            }}
            render={({ formState: localFormState, field }) => (
              <Input
                type="text"
                id="lastname"
                placeholder="Enter here..."
                {...field}
                status={hasFailedValidation<EditUserFormFields>(
                  localFormState,
                  "lastname",
                  (status) => (status ? "error" : "")
                )}
              />
            )}
          />

          {hasFailedValidation<EditUserFormFields>(formState, "lastname") ? (
            <FormError>{lastNameState.error?.message}</FormError>
          ) : null}
        </FormGroup>
      </Space>

      <FormGroup>
        <FormLabel htmlFor="address">Address</FormLabel>

        <Controller
          name="address"
          control={control}
          render={({ formState: localFormState, field }) => (
            <Input
              type="text"
              id="address"
              placeholder="Enter here..."
              {...field}
              status={hasFailedValidation<EditUserFormFields>(
                localFormState,
                "address",
                (status) => (status ? "error" : "")
              )}
            />
          )}
        />
      </FormGroup>

      <Space styles={{ item: { flex: 1 } }}>
        <FormGroup>
          <FormLabel htmlFor="age">Age*</FormLabel>

          <Controller
            name="age"
            control={control}
            rules={{
              required: { value: true, message: "Age is required" },
              min: {
                value: 10,
                message: "Age must be more than or equal to 10",
              },
            }}
            render={({ formState: localFormState, field }) => (
              <Input
                type="number"
                id="age"
                min={10}
                placeholder="Enter here..."
                {...field}
                status={hasFailedValidation<EditUserFormFields>(
                  localFormState,
                  "age",
                  (status) => (status ? "error" : "")
                )}
              />
            )}
          />

          {hasFailedValidation<EditUserFormFields>(formState, "age") ? (
            <FormError>{ageState.error?.message}</FormError>
          ) : null}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="phone">Phone*</FormLabel>

          <Controller
            name="phone"
            control={control}
            rules={{
              required: { value: true, message: "Phone is required" },
            }}
            render={({ formState: localFormState, field }) => (
              <Input
                type="text"
                id="phone"
                placeholder="Enter here..."
                {...field}
                status={hasFailedValidation<EditUserFormFields>(
                  localFormState,
                  "phone",
                  (status) => (status ? "error" : "")
                )}
              />
            )}
          />

          {hasFailedValidation<EditUserFormFields>(formState, "phone") ? (
            <FormError>{phoneState.error?.message}</FormError>
          ) : null}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="location">Location*</FormLabel>

          <Controller
            name="location"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Location is required",
              },
            }}
            render={({ formState: localFormState, field }) => (
              <Input
                type="text"
                id="location"
                placeholder="Enter here..."
                {...field}
                status={hasFailedValidation<EditUserFormFields>(
                  localFormState,
                  "location",
                  (status) => (status ? "error" : "")
                )}
              />
            )}
          />

          {hasFailedValidation<EditUserFormFields>(formState, "location") ? (
            <FormError>{locationState.error?.message}</FormError>
          ) : null}
        </FormGroup>
      </Space>

      <FormActions css={{ justifyContent: "end", marginTop: "10px" }}>
        <AppButton key="reset" onClick={handleCancel}>
          Cancel
        </AppButton>

        <AppButton key="submit" type="text" htmlType="submit">
          Update
          {/* {isLoading ? <InlineSpinner /> : null} */}
        </AppButton>
      </FormActions>
    </Form>
  );
}

export { EditUserForm };
