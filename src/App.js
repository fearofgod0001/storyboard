import Edit from "./components/tab";
import AntD from "./components/antdesign";
import AddTest from "./pages/exBank/add-test";
import EditTestBank from "./pages/exBank/edit-testbank";
import { QueryClient, QueryClientProvider } from "react-query";
import { message } from "antd";

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
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
    <QueryClientProvider client={queryClient}>
      <EditTestBank />
    </QueryClientProvider>
  );
}

export default App;
