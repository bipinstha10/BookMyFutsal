import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 left-0 z-50">
        <Header />
      </div>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
