import { ErrorToastHandler } from "./components/error-toast-handler";
import Home from "./pages/home";
import Register from "./pages/register";
import { useUserStore } from "./store/user";

function App() {
  const userStore = useUserStore();

  return (
    <div className="App bg-gray-200 h-screen p-4 md:p-8">
      {userStore.isLoggedIn ? <Home /> : <Register />}
      <ErrorToastHandler/>
    </div>
  );
}

export default App;
