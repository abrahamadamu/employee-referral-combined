import { createContext, useState, ReactNode } from "react";

export const referralContext = createContext<{
  get: { url: string; id: string };
  set: (v: { id: string; url: string }) => void;
}>({ get: { url: "/signup/form", id: "" }, set: () => {} });

function Initializer({ children }: { children: ReactNode }) {
  const [referralURL, setReferralURL] = useState<{ id: string; url: string }>({
    url: "/signup/form",
    id: "",
  });

  return (
    <referralContext.Provider value={{ get: referralURL, set: setReferralURL }}>
      {children}
    </referralContext.Provider>
  );
}

export default Initializer;
