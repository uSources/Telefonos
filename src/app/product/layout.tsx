import { PropsWithChildren } from "react";

import { Navbar } from "@/components/common/navbar";

export default function ProductLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto">{children}</div>
    </>
  );
}
