import { notification } from "antd";

function useNotification() {
  const [api, contextHolder] = notification.useNotification();

  const showSuccess = (description: string) => {
    api["success"]({
      message: "Success",
      description: description,
      className: "notification-wrapper",
    });
  };

  const showError = (description: string) => {
    api["error"]({
      message: "Error",
      description: description,
      className: "notification-wrapper",
    });
  };

  const showWarning = (description: string) => {
    api["warning"]({
      message: "warning",
      description: description,
      className: "notification-wrapper",
    });
  };

  const showInfo = (description: string) => {
    api["info"]({
      message: "Info",
      description: description,
      className: "notification-wrapper",
    });
  };

  return { showError, showInfo, showSuccess, showWarning, contextHolder };
}

export { useNotification };
