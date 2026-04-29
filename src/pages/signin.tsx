import React from "react";
import { useSearchParams } from "react-router";
import { Alert, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, type User } from "firebase/auth";
import ConsentDialog from "@/components/dialogs/consent-dialog";
import useSessionStore from "@/stores/use-session-store";
import useAsyncEffect from "@/hooks/use-async-effect";
import $User from "@/services/user";
import { auth } from "@/lib/firebase";
import Env from "@/lib/env";
import Logger from "@/lib/logger";

const Signin = () => {
  const { setUser } = useSessionStore();
  const [searchParams] = useSearchParams();

  const [step, setStep] = React.useState<"email" | "confirmation" | "consent">("email");
  const [error, setError] = React.useState<"email" | "empty-email" | "confirmation" | "consent" | null>(null);
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const verify = searchParams.get("verify");

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);

    if (error) {
      setError(null);
    }
  }

  function handleReset() {
    setStep("email");
    setError(null);
    setEmail("");
  }

  function handleConsentDecline() {
    setStep("email");
    setError("consent");
  }

  async function handleEmailSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!email) {
      setError("empty-email");
      return;
    }

    setStep("consent");
  }

  async function handleConsentAccept() {
    setLoading(true);
    setStep("email");

    if (error) {
      setError(null);
    }

    try {
      await sendSignInLinkToEmail(auth, email, {
        url: `${Env.APP_URL}/signin?verify=${encodeURIComponent(email)}`,
        handleCodeInApp: true,
      });

      setStep("confirmation");
    } catch {
      setError("email");
    } finally {
      setLoading(false);
    }
  }

  async function checkUser(data: User) {
    const user = await $User.get(data.uid);

    if (user) {
      Logger.log("user exists", user);
      return;
    }

    Logger.log("user does not exist", data);

    await $User.create({
      id: data.uid,
      email: data.email!,
      consent_date: new Date().toISOString(),
      privacy_policy_accepted: true,
      terms_and_conditions_accepted: true,
      data_processing_consent: true,
    });
  }

  useAsyncEffect(async () => {
    if (verify) {
      const email = decodeURIComponent(verify);
      const url = window.location.href;

      if (isSignInWithEmailLink(auth, url)) {
        try {
          setLoading(true);

          const result = await signInWithEmailLink(auth, email, url);

          await checkUser(result.user);

          setUser(result.user);
          setLoading(false);
        } catch {
          setError("confirmation");
          setLoading(false);
        }
      } else {
        setError("confirmation");
      }
    }
  }, [verify]);

  return (
    <>
      {verify ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          gap={2}
          width="min(100%, 400px)"
          marginX="auto"
          padding={2}
          borderRadius={2}
          bgcolor="background.paper"
        >
          <Typography>Verificando tu correo electrónico...</Typography>
          {error === "confirmation" ? (
            <Alert severity="error" variant="outlined">
              Ha ocurrido un error. Por favor, verifica que tu correo electrónico es correcto e intenta nuevamente.
            </Alert>
          ) : (
            <CircularProgress size={48} />
          )}
          <Button disabled={loading} fullWidth onClick={handleReset}>
            Atrás
          </Button>
        </Stack>
      ) : (
        <Stack
          component="form"
          alignItems="center"
          justifyContent="center"
          gap={2}
          width="min(100%, 400px)"
          marginX="auto"
          padding={2}
          borderRadius={2}
          bgcolor="background.paper"
          onSubmit={step === "email" ? handleEmailSubmit : undefined}
        >
          {step === "email" ? (
            <>
              <Typography>Ingresa con tu correo electrónico</Typography>
              <Typography variant="body2" fontWeight={300} color="text.secondary">
                Te enviaremos un enlace de acceso para que puedas iniciar sesión facilmente.{" "}
                <b>Si no recibes el correo, revisa tu bandeja de spam.</b>
              </Typography>
              <TextField value={email} placeholder="example@email.com" fullWidth onChange={handleEmailChange} />
              {error === "email" ? (
                <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
                  Ha ocurrido un error. Por favor, verifica que tu correo electrónico es correcto e intenta nuevamente.
                </Alert>
              ) : error === "empty-email" ? (
                <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
                  Por favor, ingresa tu correo electrónico.
                </Alert>
              ) : null}
              {error === "consent" ? (
                <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
                  Por favor, acepta el consentimiento para el tratamiento de datos personales.
                </Alert>
              ) : null}
              <Button type="submit" loading={loading} fullWidth>
                Enviar
              </Button>
            </>
          ) : step === "confirmation" ? (
            <>
              <Typography>Revisa tu Email</Typography>
              <Typography variant="body2" fontWeight={300} color="text.secondary">
                Te hemos enviado un enlace de acceso a tu correo electrónico. Sigue las instrucciones para iniciar sesión.
              </Typography>
              <Button variant="outlined" fullWidth onClick={handleReset}>
                Atrás
              </Button>
            </>
          ) : null}
        </Stack>
      )}

      <ConsentDialog open={step === "consent"} email={email} onAccept={handleConsentAccept} onDecline={handleConsentDecline} />
    </>
  );
};

export default Signin;
