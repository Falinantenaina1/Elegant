import type { PropsWithChildren } from "react";

export const Section = (props: PropsWithChildren & { className?: string }) => {
  return (
    <section className={`${props.className || ""} `}>{props.children}</section>
  );
};
