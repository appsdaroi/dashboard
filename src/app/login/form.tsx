"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { UserIcon, LockClosedIcon, ArrowRightIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { TextInput, Button, Callout } from "@tremor/react";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");

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

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("Usuário ou senha inválidos.");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <Callout
          className="h-12 mt-4 mb-6"
          title="Erro ao realizar login"
          icon={ExclamationTriangleIcon}
          color="rose"
        >
          Usuário ou senha inválidos.
        </Callout>
      )}
      <div className="mb-6">
        <TextInput
          required
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Usuário"
          icon={UserIcon}
          className="py-3"
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
          className="py-3"
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
