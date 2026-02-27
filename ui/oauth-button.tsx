import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";  // your auth-client path

interface Props {
  provider: string;
}

export default function OauthProvider({provider}: Props) {

  const getIcon = () => {
    switch (provider) {
      case "github":
        return <FaGithub className="w-5 h-5" />;
      case "google":
        return <FcGoogle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const handleSocialSignin = async (provider: string) => {
    // your logic
  };

  return (
    <Button
      type="button"
      onClick={() => handleSocialSignin(provider)}
      variant="outline"
      className="w-full flex items-center gap-2"
    >
      {getIcon()}
      <span>
        Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
      </span>
    </Button>
  );
}
