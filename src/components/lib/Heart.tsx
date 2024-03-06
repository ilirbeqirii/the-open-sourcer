/** @jsxImportSource @emotion/react */

import { Tooltip } from "antd";
import { AppButton } from "../forms/lib";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

type HeartProps = {
  onClick: () => void;
  isMarked?: boolean;
  [key: string]: unknown;
};

function Heart({ onClick, isMarked, ...props }: HeartProps) {
  return (
    <AppButton
      type="text"
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
      }}
      {...props}
      onClick={() => onClick()}
      icon={
        isMarked ? (
          <Tooltip title="Mark as unfavorite">
            <HeartFilled css={{ color: "white" }} />
          </Tooltip>
        ) : (
          <Tooltip title="Mark as favorite">
            <HeartOutlined />
          </Tooltip>
        )
      }
    />
  );
}

export { Heart };
