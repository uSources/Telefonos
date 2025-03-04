import { PropsWithChildren } from "react";

import { Navbar } from "@/components/navbar";

export default function PhoneLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto">{children}</div>
    </>
  );
}
