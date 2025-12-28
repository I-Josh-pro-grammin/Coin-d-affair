import { useEffect } from "react";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export function Page({ title, children }: Props) {
  useEffect(() => {
    if (title) {
      document.title = `${title} • Akaguriro`;
    } else {
      document.title = "Akaguriro - Petites Annonces";
    }
  }, [title]);

  return <>{children}</>;
}


