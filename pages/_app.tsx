import "uno.css";
import "../styles/globals.css";
import "reflect-metadata";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Modal from "react-modal";
import { useEffect } from "react";
import { wrapper } from "@/src/redux/store";
import { Provider } from "react-redux";
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </Provider>
  );
}
export default App;
