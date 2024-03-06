import { Spin, SpinProps } from "antd";

function FullPageSpinner(props: SpinProps = { delay: 0 }) {
  return <Spin tip="Loading..." {...props}  fullscreen size="large" />;
}

export default FullPageSpinner;
