declare module "react-obfuscate" {
  import type { ReactElement } from "react";

  type Props = {
    element?: ReactElement;
    children?: ReactElement;
    tel?: string;
    sms?: string;
    facetime?: string;
    email?: string;
    href?: string;
    headers?: Record<string, string>;
    obfuscate?: boolean;
    obfuscateChildren?: boolean;
    linkText?: string;
    style?: Record<string, string>;
    onClick?: () => void;
  };

  function Obfuscate(props: Props): ReactElement;
  export = Obfuscate;
}
