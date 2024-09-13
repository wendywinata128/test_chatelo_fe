import { FormEventHandler } from "react";
import { CreateUserModal } from "../components/create-user/create-user-modal";
import { createAccount } from "../api/methods/account";

export default function Register() {
  const onCreateAccountSubmitted = (formRef: HTMLFormElement) => {
    const data = Object.fromEntries(new FormData(formRef));

    createAccount(data.name.toString(), data.color.toString());
    formRef.reset();
  };
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <CreateUserModal onCreateMyAccount={onCreateAccountSubmitted} />
    </div>
  );
}
