import { useEffect, useMemo, useState } from "react";
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordRepeat,
} from "../utils/validation";

type Mode = "login" | "signup";

type ServerErrors = {
  email?: string;
  password?: string;
  passwordRepeat?: string;
  nickname?: string;
};

export function useAuthForm(mode: Mode) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serverErrors, setServerErrors] = useState<ServerErrors>({});

  const emailError = useMemo(() => validateEmail(email), [email]);
  const passwordError = useMemo(() => validatePassword(password), [password]);
  const passwordRepeatError = useMemo(
    () =>
      mode === "signup" ? validatePasswordRepeat(password, passwordRepeat) : "",
    [password, passwordRepeat, mode]
  );
  const nicknameError = useMemo(
    () => (mode === "signup" ? validateNickname(nickname) : ""),
    [nickname, mode]
  );

  const hasServerError = Object.keys(serverErrors).length > 0;
  const isFormValid =
    !emailError &&
    !passwordError &&
    (mode === "login" || (!passwordRepeatError && !nicknameError)) &&
    !hasServerError;

  const emailErrorMessage = serverErrors.email || emailError;
  const passwordErrorMessage = serverErrors.password || passwordError;
  const passwordRepeatErrorMessage =
    serverErrors.passwordRepeat || passwordRepeatError;
  const nicknameErrorMessage = serverErrors.nickname || nicknameError;

  const applyServerErrors = (details: any) => {
    const nextErrors: ServerErrors = {};

    if (details.email) nextErrors.email = details.email.message;
    if (details.password) nextErrors.password = details.password.message;
    if (details.nickname) nextErrors.nickname = details.nickname.message;
    if (details.passwordRepeat)
      nextErrors.passwordRepeat = details.passwordRepeat.message;

    setServerErrors(nextErrors);

    setTouched((prev) => ({
      ...prev,
      ...Object.keys(nextErrors).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      ),
    }));
  };

  useEffect(() => {
    setServerErrors((prev) => {
      if (!prev.email) return prev;
      const { email, ...rest } = prev;
      return rest;
    });
  }, [email]);

  useEffect(() => {
    setServerErrors((prev) => {
      if (!prev.password) return prev;
      const { password, ...rest } = prev;
      return rest;
    });
  }, [password]);

  useEffect(() => {
    setServerErrors((prev) => {
      if (!prev.passwordRepeat) return prev;
      const { passwordRepeat, ...rest } = prev;
      return rest;
    });
  }, [passwordRepeat]);

  useEffect(() => {
    setServerErrors((prev) => {
      if (!prev.nickname) return prev;
      const { nickname, ...rest } = prev;
      return rest;
    });
  }, [nickname]);

  return {
    email,
    password,
    passwordRepeat,
    nickname,
    setEmail,
    setPassword,
    setPasswordRepeat,
    setNickname,
    showPassword,
    setShowPassword,
    showPasswordRepeat,
    setShowPasswordRepeat,
    touched,
    setTouched,
    emailError,
    passwordError,
    passwordRepeatError,
    nicknameError,
    isFormValid,
    emailErrorMessage,
    passwordErrorMessage,
    passwordRepeatErrorMessage,
    nicknameErrorMessage,
    applyServerErrors,
    clearServerErrors: () => setServerErrors({}),
  };
}
