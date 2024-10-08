import React,{lazy, Suspense, useEffect,useState} from "react";
import ReactDOM from 'react-dom/client';
import Header from "./component/Header";
import Body from "./component/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./component/About";
import Contact from "./component/Contact";
import Error from "./component/Error";
import RestaurantMenu from "./component/RestaurantMenu";
import ShimmerUI from "./component/ShimmerUI";
import UserContext from "./utils/UserContext";
import {Provider} from "react-redux";
import appStore from "./utils/appStore";
// import Grocery from "./component/Grocery";
import Cart from "./component/Cart";

/*
Header
-Logo
-Nav Icon

Body
-Search
-RestaurantContainer
-RestauratCard
--img
--Name of the restaurent, star rating, cuisines, delivery time 

Footer
-Copyright
-Links
-Address
-Contact

Footer
*/   

const Grocery = lazy(()=>import("./component/Grocery"));

const AppLayout = () =>{
  const [userName, setUserName] = useState();

  //Authentication
  useEffect(()=>{
    //Make an API call and send username and password 
    const data = {
      name : "Khushi"
    }
    setUserName(data.name);
  },[])

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  )
}    

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <AppLayout />,
    children:[
      {
        path : "/",
        element : <Body />
      },
      {
        path : "/about",
        element : <About />
      },
      {
        path : "/contact",
        element : <Contact />
      },
      {
        path : "/grocery",
        element : <Suspense fallback={<ShimmerUI />}><Grocery /></Suspense>
      },
      {
        path : "/restaurants/:resId",
        element : <RestaurantMenu />
      },
      {
        path : "/cart",
        element : <Cart />
      }
    ],
    errorElement: <Error />
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);