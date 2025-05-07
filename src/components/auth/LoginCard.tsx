
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginFormFields from "./LoginFormFields";
import LoginFooter from "./LoginFooter";
import { useLoginForm } from "@/hooks/useLoginForm";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginCard: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isSubmitting,
    loginError,
    locationMessage,
    handleSubmit
  } = useLoginForm();

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {locationMessage && (
          <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
            <AlertDescription>{locationMessage}</AlertDescription>
          </Alert>
        )}
        
        {loginError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}
        
        <LoginFormFields
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isSubmitting={isSubmitting}
          loginError={loginError}
          locationMessage={locationMessage}
          onSubmit={handleSubmit}
        />
      </CardContent>
      <LoginFooter />
    </Card>
  );
};

export default LoginCard;
