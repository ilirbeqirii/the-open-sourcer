import { Alert } from "antd";

type ErrorProps = { error: Error; [key: string]: unknown };

function ErrorAlert({ error, ...props }: ErrorProps) {
  return (
    <Alert
      message={`Error: ${error.message}`}
      type="error"
      showIcon
      closable
      {...props}
    />
  );
}

export { ErrorAlert };
