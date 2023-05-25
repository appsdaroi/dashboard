"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { UserIcon, LockClosedIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

import { TextInput, Button } from "@tremor/react";

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
        setError("invalid name or password");
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

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <p className="py-4 mb-6 text-center bg-red-300 rounded">{error}</p>
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
        // style={{ opacity: `${loading ? "0.5" : "1"}` }}
        // className="inline-block w-full py-4 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
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
