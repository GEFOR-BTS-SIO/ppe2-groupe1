import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
 const [queryClient] = useState(() => new QueryClient());

 return (
   <QueryClientProvider client={queryClient}>
     <Component {...pageProps} />
   </QueryClientProvider>
 );
}
