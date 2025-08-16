import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Header />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
