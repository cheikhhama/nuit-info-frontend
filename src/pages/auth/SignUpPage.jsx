import { useState } from "react";
import { Toaster } from "react-hot-toast";
import CustomAuthForm from "../../components/auth/CustomAuthForm";
import CustomAuthHeaderText from "../../components/auth/CustomAuthHeaderText";
import CustomAuthInput from "../../components/auth/CustomAuthInput";
import CustomAuthButton from "../../components/auth/CustomAuthButton";
import CustomAuthText from "../../components/auth/CustomAuthText";
import { AUTH_ENDPOINTS, BASE_URL } from "../../api/endPoints";
import useRegister from "../../hooks/useRegister";
import { validateEmail, validatePassword, validateUsername } from "../../validation/validations";
import Navbar from "../../components/shared/Navbar";

const validator = (username, password, email, confirmPassword) => {
  const errors = {};
  if (!username) errors.username = "Le nom d'utilisateur est requis";
  else if (username.length < 2)
    errors.username = "Le nom d'utilisateur doit contenir au moins 2 caractères";
  if (!password) errors.password = "Le mot de passe est requis";
  else if (!validatePassword(password))
    errors.password = "Le mot de passe doit contenir au moins 6 caractères";
  if (!confirmPassword) errors.confirmPassword = "Veuillez confirmer votre mot de passe";
  else if (password !== confirmPassword)
    errors.confirmPassword = "Les mots de passe ne correspondent pas";
  else if (!email) errors.email = "L'email est requis";
  else if (!validateEmail(email)) errors.email = "Format d'email invalide";
  return errors;
};

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { register, isLoading } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validator(username, password, email, confirmPassword);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    await register(
      `${BASE_URL}${AUTH_ENDPOINTS.REGISTER}`,
      { username, email, password },
      "/auth/login"
    );
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <CustomAuthForm onSubmit={handleSubmit}>
        <CustomAuthHeaderText
          title="Créer un compte"
          subtitle="Inscrivez-vous pour accéder à votre compte"
        />
        <CustomAuthInput
          type="text"
          placeholder="Entrez votre nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
        />
        <CustomAuthInput
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <CustomAuthInput
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <CustomAuthInput
          type="password"
          placeholder="Confirmez votre mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
        <br />
        <CustomAuthButton
          type="submit"
          text={isLoading ? "Chargement..." : "S'inscrire"}
        />
        <CustomAuthText
          href="/auth/login"
          text="Vous avez déjà un compte?"
          linkText="Se connecter"
        />
      </CustomAuthForm>
    </div>
  );
}