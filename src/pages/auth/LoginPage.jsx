import { useState } from "react";
import CustomAuthInput from "../../components/auth/CustomAuthInput";
import CustomAuthButton from "../../components/auth/CustomAuthButton";
import CustomAuthForm from "../../components/auth/CustomAuthForm";
import CustomAuthText from "../../components/auth/CustomAuthText";
import CustomAuthHeaderText from "../../components/auth/CustomAuthHeaderText";
import {
  validatePassword,
  validateUsername,
} from "../../validation/validations";
import useLogin from "../../hooks/useLogin";
import { AUTH_ENDPOINTS, BASE_URL } from "../../api/endPoints";
import { Toaster } from "react-hot-toast";
import Navbar from "../../components/shared/Navbar";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, isLoading } = useLogin();

  const validator = (username, password) => {
    const errors = {};
    if (!username) errors.username = "Le nom d'utilisateur est requis";
    else if (!validateUsername(username))
      errors.username = "Format du nom d'utilisateur invalide";
    if (!password) errors.password = "Le mot de passe est requis";
    else if (!validatePassword(password))
      errors.password = "Le mot de passe doit contenir au moins 6 caractères";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validator(username, password);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    const data = {
      username: username,
      password: password,
    };
    await login(`${BASE_URL}${AUTH_ENDPOINTS.LOGIN}`, data, "/");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <CustomAuthForm onSubmit={handleSubmit}>
        <CustomAuthHeaderText
          title="Bienvenue"
          subtitle="Connectez-vous à votre compte pour continuer"
        />
        <CustomAuthInput
          type="username"
          placeholder="Entrez votre nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
        />
        <CustomAuthInput
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <br />

        <CustomAuthButton 
          type="submit" 
          text={isLoading ? "Chargement..." : "Se connecter"} 
        />
        <CustomAuthText
          to="/auth/sign-up"
          text="Vous n'avez pas de compte?"
          linkText="En créer un"
        />
      </CustomAuthForm>
    </div>
  );
}