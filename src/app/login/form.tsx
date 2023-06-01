"use client";

import { getSession, signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { UserIcon, LockClosedIcon, ArrowRightIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { TextInput, Button } from "@tremor/react";
import { toast } from "react-toastify";

import Cookies from "js-cookie";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setFormValues({ name: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        name: formValues.name,
        password: formValues.password,
        callbackUrl,
      });

      const session = await getSession();
      Cookies.set('user.token', session?.session.user.token)

      if (!res?.error) return router.push(callbackUrl);

      setLoading(false);
      toast.error("Usuário ou senha inválidos.");
    } catch (error: any) {

      setLoading(false);
      toast.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <TextInput
          required
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Usuário"
          icon={UserIcon}
        />
      </div>
      <div className="mb-6">
        <TextInput
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Senha"
          icon={LockClosedIcon}
        />
      </div>
      <Button
        size="md"
        type="submit"
        variant="primary"
        disabled={loading}
        className="w-full py-3"
        icon={ArrowRightIcon}
        loading={loading}
        loadingText="Entrando..."
      >
        Entrar
      </Button>
    </form>
  );
};
