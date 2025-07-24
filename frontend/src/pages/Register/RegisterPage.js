import {useEffect}from "react";
import { useForm } from 'react-hook-form';
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import classes from "./registerPage.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { EMAIL } from "../../constants/patterns";

export default function RegisterPage() {
  const auth = useAuth();
  const {user} = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user]);


  const {
    handleSubmit,
    register,
    getValues,
    formState:{errors},
  } = useForm();
  
  const submit = async data => {
    await auth.register(data);
  };

  return (
  <div className={classes.container}>
    <div className={classes.details}>
        <Title title="Register"/>
        <form onSubmit={handleSubmit(submit)} noValidate>
        <Input
            type="text"
            label="Nama"
            {...register('name', {
              required: true,
              minLength: 5,
            })}
            error={errors.name}
          />

        <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
              pattern: EMAIL,
            })}
            error={errors.email}
          />

        <Input
            type="password"
            label="Password"
            {...register('password', {
              required: true,
              minLength: 5,
            })}
            error={errors.password}
          />

        <Input
            type="password"
            label="Konfirmasi Password"
            {...register('confirmPassword', {
              required: true,
              validate: value =>
                value !== getValues('password')
                  ? 'Passwords tidak cocok'
                  : true,
            })}
            error={errors.confirmPassword}
          />

        <Input
            type="text"
            label="Alamat"
            {...register('address', {
              required: true,
              minLength: 10,
            })}
            error={errors.address}
        />
 
        <Button type="submit" text="Register" backgroundColor="#040226" />

        <div className={classes.login}>
            Sudah punya akun? &nbsp;
            <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Login di sini
            </Link>
          </div>
        </form>
    </div>
  </div>
  );
}
