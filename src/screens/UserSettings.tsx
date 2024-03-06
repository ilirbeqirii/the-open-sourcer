/** @jsxImportSource @emotion/react */

import { UserInfo } from "../api/models/user";
import { useAsync } from "../hooks/use-async";
import { useEffect, useState } from "react";
import * as authService from "../data-access/auth-service";
import FullPageSpinner from "../components/lib/FullPageSpinner";
import Wrapper from "../components/lib/Wrapper";
import { ErrorAlert } from "../components/lib/ErrorAlert";
import { EditUserForm } from "../components/EditUserForm";
import { UserDetails } from "../components/UserDetails";
import { Dialog } from "../components/lib/Dialog";
import { EditUserFormFields } from "../components/forms/models";
import { useNotification } from "../hooks/use-notification";

function UserSettingsScreen() {
  const {
    data: userInfo,
    error,
    isError,
    isLoading,
    isSuccess,
    isIdle,
    run,
    setData,
  } = useAsync<UserInfo>();

  const [isOpen, setIsOpen] = useState(false);
  const { showSuccess, showError, contextHolder } = useNotification();

  useEffect(() => {
    const promise = authService.getProfile();
    run(promise);
  }, [run]);

  const openEditModal = () => {
    setIsOpen(true);
  };

  const handleUpdate = async (data: EditUserFormFields) => {
    try {
      setIsOpen(false);
      const updatedProfile = await authService.updateProfile(data);
      setData(updatedProfile);

      showSuccess("Action completed successfully!");
    } catch (error) {
      showError("Something went wrong!");
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  if (isLoading || isIdle) {
    return <FullPageSpinner delay={100} />;
  }

  if (isSuccess && userInfo) {
    return (
      <Wrapper>
        {contextHolder}

        <UserDetails userInfo={userInfo} openEditModal={openEditModal} />

        <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
          <EditUserForm
            userInfo={userInfo}
            handleUpdateFn={handleUpdate}
            handleCancelFn={handleCancel}
          />
        </Dialog>

        {isError && error ? (
          <ErrorAlert error={error} css={{ marginTop: "2rem" }} />
        ) : null}
      </Wrapper>
    );
  }
}

export default UserSettingsScreen;
