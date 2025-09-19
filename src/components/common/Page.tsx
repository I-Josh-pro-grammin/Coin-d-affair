import { useEffect } from "react";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export function Page({ title, children }: Props) {
  useEffect(() => {
    if (title) {
      document.title = `${title} • CoinD'affaires`;
    } else {
      document.title = "CoinD'affaires - Petites Annonces";
    }
  }, [title]);

  return <>{children}</>;
}


