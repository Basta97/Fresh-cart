import { useEffect ,useContext} from 'react'
import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import CheckOut from './components/CheckOut/CheckOut'
import Orders from './components/Orders/Orders'
import ForgetPass from './components/ForgetPass/ForgetPass'


import { Helmet } from 'react-helmet'
import { tokenContext } from './contexts/tokenContext'
import { ProtectedRoute } from './components/protectedRoute/protectedRoute'
import { AuthView } from './components/authView/authView'
import ProductDetail from './components/ProductDetail/ProductDetail'
import { ToastContainer } from 'react-toastify'
import SubCategory from './components/Categories/component/SubCategory/SubCategory'
import Wishlist from './components/WishList/WishList'
import Verify from './components/Verify/Verify'
import ResetPassword from './components/ResetPassword/ResetPassword'






function App() {
  
  let {setToken} = useContext(tokenContext);

  useEffect(() => {
   if(localStorage.getItem("authToken")){
    setToken(localStorage.getItem("authToken"))
   }

  }, [])

  const router = createBrowserRouter(
    [
       { path: "", element: <Layout /> , children: [

         { index:true , element: <Home /> },
         { path:"home" , element:<ProtectedRoute><Home /></ProtectedRoute>  },
         { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
         { path: "subcategories/:categoryId", element: <ProtectedRoute><SubCategory /></ProtectedRoute> },
         { path: "brands", element:<ProtectedRoute><Brands /></ProtectedRoute>  },
         { path: "productDetail/:id/:categoryId", element:<ProtectedRoute><ProductDetail /></ProtectedRoute>  },
         { path: "products", element:<ProtectedRoute><Products /></ProtectedRoute>  },
         { path: "login", element:<AuthView><Login /></AuthView>  },
         { path: "register", element:<AuthView><Register /></AuthView>  },
         { path: "cart", element:<ProtectedRoute><Cart /> </ProtectedRoute> },
         { path: "checkout", element:<ProtectedRoute><CheckOut /> </ProtectedRoute> },
         { path: "wishlist", element:<ProtectedRoute><Wishlist /> </ProtectedRoute> },
         { path: "allorders", element:<ProtectedRoute><Orders /> </ProtectedRoute> },
         { path: "forgot-password", element:<AuthView><ForgetPass /> </AuthView> },
         { path: "verify-reset-code", element:<AuthView><Verify /> </AuthView> },

         { path: "reset-password", element:<AuthView><ResetPassword /> </AuthView> },


         { path: "*", element: <NotFound /> },

     
       ] },
    ]
  )

  return (
    <>
    <Helmet>
    <title>SBO </title>
    </Helmet>
    
     <RouterProvider router={router} >
      </RouterProvider>
      <ToastContainer />
    </>
  )
}

export default App
