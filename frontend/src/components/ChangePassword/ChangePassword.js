import React from "react";
import { useForm } from "react-hook-form";
import Title from "../Title/Title";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/useAuth";

export default function ChangePassword() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const { changePassword } = useAuth();
  const submit = (passwords) => {
    changePassword(passwords);
  };

  return (
    <div>
      <Title title="Ubah Password" />
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="password"
          label="Password Lama"
          {...register("currentPassword", {
            required: true,
          })}
          error={errors.currentPassword}
        />
        <Input
          type="password"
          label="Password Baru"
          {...register("newPassword", {
            required: true,
            minLength: 5,
          })}
          error={errors.newPassword}
        />
        <Input
          type="password"
          label="Ulangi Password Baru"
          {...register("confirmNewPassword", {
            required: true,
            validate: (value) =>
              value != getValues("newPassword") ? "Passwords Tidak Sama" : true,
          })}
          error={errors.confirmNewPassword}
        />
        <Button type="submit" text="Ubah" />
      </form>
    </div>
  );
}
