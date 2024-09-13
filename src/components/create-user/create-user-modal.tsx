import { createPortal } from "react-dom";
import { BaseModal } from "../base-modal";
import TextField from "../text-field";
import { SketchPicker } from "react-color";
import ColorPicker from "../color-picker";
import { EventHandler, FormEventHandler, useRef, useState } from "react";

export function CreateUserModal({
  onCreateMyAccount,
}: {
  onCreateMyAccount: (formRef: HTMLFormElement) => void;
}) {

  const formRef = useRef<HTMLFormElement>(null);

  const onFormSubmitted: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if(formRef.current){
      onCreateMyAccount(formRef.current);
    }
  }
 

  return (
    <BaseModal show={true}>
      <form className="w-[500px] max-w-full bg-white rounded pb-6" ref={formRef} onSubmit={onFormSubmitted}>
        <h4 className="text-center p-4 border-b border-b-gray-400 mb-4 font-semibold">
          Create New Account
        </h4>

        <div className="flex flex-col gap-3 px-4 mb-8">
          <TextField
            title="Name"
            className="rounded"
            placeholder="Enter your name"
            name="name"
            required
          />

          <ColorPicker name="color"/>
        </div>

        <div className="flex justify-center">
          <button className="bg-accent text-white py-2 px-8 rounded" type="submit">
            Create My Account
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
