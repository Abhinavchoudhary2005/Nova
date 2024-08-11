import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar.jsx";
import { Shop } from "./Pages/Shop";
import { ShopCategory } from "./Pages/ShopCategory";
import { Product } from "./Pages/Product";
import { Cart } from "./Pages/Cart";
import { LoginSignUp } from "./Pages/LoginSignUp.jsx";
import { Footer } from "./Components/Footer/Footer.jsx";
import { ShopContext } from "./Components/Context/ShopContext.jsx";
import { NotFound } from "./Pages/NotFound";
import { PrivacyPolicy } from "./Pages/PrivacyPolicy.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { Admin } from "./Pages/Admin";
import { Orders } from "./Pages/Orders.jsx";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const showNavbarAndFooter =
    !location.pathname.includes("/E-commerce/admin") &&
    !location.pathname.includes("/E-commerce/Admin");

  return (
    <>
      {showNavbarAndFooter && <Navbar />}
      {children}
      {showNavbarAndFooter && <Footer />}
    </>
  );
};

function App() {
  const { banner } = useContext(ShopContext);

  const bannerMen = banner.filter((i) => i.category === "men");
  const bannerWomen = banner.filter((i) => i.category === "women");
  const bannerKid = banner.filter((i) => i.category === "kid");

  const getLastImage = (bannerArray) => {
    return bannerArray.length > 0
      ? bannerArray[bannerArray.length - 1].image
      : null;
  };

  return (
    <div>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/E-commerce" element={<Shop />} />
            <Route
              path="/E-commerce/Men"
              element={
                <ShopCategory banner={getLastImage(bannerMen)} category="men" />
              }
            />
            <Route
              path="/E-commerce/Women"
              element={
                <ShopCategory
                  banner={getLastImage(bannerWomen)}
                  category="women"
                />
              }
            />
            <Route
              path="/E-commerce/Kids"
              element={
                <ShopCategory banner={getLastImage(bannerKid)} category="kid" />
              }
            />
            <Route path="/E-commerce/Product" element={<Product />}>
              <Route path=":ProductId" element={<Product />} />
            </Route>
            <Route path="/E-commerce/Cart" element={<Cart />} />
            <Route path="/E-commerce/Login" element={<LoginSignUp />} />
            <Route path="/E-commerce/Orders" element={<Orders />} />
            <Route
              path="/E-commerce/admin"
              element={<PrivateRoute element={Admin} />}
            />
            <Route
              path="/E-commerce/privacypolicy"
              element={<PrivacyPolicy />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
