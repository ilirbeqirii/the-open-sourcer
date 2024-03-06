import styled from "@emotion/styled";
import { Button } from "antd";
import { buttonStyles } from "../../styles/buttons";

const Form = styled.form({
  display: "grid",
  gap: "1rem",
});

const FormLabel = styled.label({
  color: "#fff",
});

const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "0.3125rem",
});

const FormActions = styled.div({
  display: "flex",
  gap: "0.6125rem",
});

const AppButton = styled(Button)((props) => {
  if (props.type == "primary") {
    return buttonStyles[props.type];
  }

  if (props.type == "text") {
    return buttonStyles[props.type];
  }

  return buttonStyles.default;
});

const FormError = styled.div({
  color: "#ff4343",
  fontSize: "14px",
});

export { FormGroup, FormActions, AppButton, Form, FormError, FormLabel };
