/** @jsxImportSource @emotion/react */

import { ConfigProvider, Descriptions } from "antd";
import { AppButton } from "./forms/lib";
import { UserInfo } from "../api/models/user";

type UserDetailsProps = {
  openEditModal: () => void;
  userInfo: UserInfo;
};

function UserDetails({ openEditModal, userInfo }: UserDetailsProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Descriptions: {
            contentColor: "rgba(255,255,255, 0.7)",
            labelBg: "rgb(24, 48, 71)",
            titleColor: "#fff",
          },
        },
      }}
    >
      <Descriptions
        title="Personal Information"
        labelStyle={{
          color: "var(--accent-clr)",
          fontSize: "1rem",
          padding: "5px 10px",
        }}
        contentStyle={{
          fontSize: "1rem",
          padding: "5px 10px",
          marginRight: "15px",
          borderBottom: "1px solid rgb(24, 48, 71)",
        }}
        layout="vertical"
        size="small"
        colon={false}
        css={{
          borderRadius: "6px",
          backgroundColor: "rgb(22, 27, 34)",
          padding: "30px",
        }}
        extra={<AppButton onClick={openEditModal}>Edit</AppButton>}
      >
        <Descriptions.Item
          label="Username"
          span={3}
          css={{ borderRadius: "6px !important" }}
        >
          {userInfo?.username || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="FirstName">
          {userInfo?.firstname || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="LastName">
          {userInfo?.lastname || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Age">
          {userInfo?.age || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Address" span={3}>
          {userInfo?.address || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Phone">
          {userInfo?.phone || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Living">
          {userInfo?.location || "N/A"}
        </Descriptions.Item>
      </Descriptions>
    </ConfigProvider>
  );
}

export { UserDetails };
