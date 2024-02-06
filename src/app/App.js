import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { message } from "antd";

import { RecoilRoot } from "recoil";
import AppInitializer from "./AppInitializer";
const App = (props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
        onSettled: (___, error) => {
          if (error) {
            message.error(error.errorMsg);
          }
        },
      },
      mutations: {
        onSettled: (___, error) => {
          if (error) {
            message.error(error.errorMsg);
          }
        },
      },
    },
  });
  return (
    <RecoilRoot override={false}>
      <QueryClientProvider client={queryClient}>
        <AppInitializer {...props} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
