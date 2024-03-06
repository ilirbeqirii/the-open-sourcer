import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Tooltip } from "antd";

function TogglePassword(visible: boolean) {
  return visible ? (
    <Tooltip title="Hide Password">
      <EyeInvisibleFilled />
    </Tooltip>
  ) : (
    <Tooltip title="Show Password">
      <EyeFilled />
    </Tooltip>
  );
}

export default TogglePassword;
