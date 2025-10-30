import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useLoading } from "./hooks/useLoading";
import {setLoadingInterceptor} from "./interceptors/loadingInterceptors";
import { useEffect } from "react";

function App() {
  const {showLoading, hideLoading } = useLoading();
  
  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);

  return (
    <>
      <ScrollToTop />
      <Loading/>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
