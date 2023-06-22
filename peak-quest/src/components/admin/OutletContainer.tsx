import React, { ReactNode } from "react";

export default function OutletContainer({ children }: { children: ReactNode }) {
  return <div className="flex w-full h-full overflow-hidden">{children}</div>;
}
