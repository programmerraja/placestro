

import {React,useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { Helmet } from 'react-helmet';

//components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SquareLoader from './components/SquareLoader';



//pages
import Home from './pages/Home';
import Companies from './pages/Companies';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import EmailVerified from "./pages/EmailVerified";
import UserProfile from "./pages/UserProfile";
import AddReview from "./pages/AddReview";
import Reviews from "./pages/Reviews";
import MyReviews from "./pages/MyReviews";
import EditReviews from "./pages/EditReviews";
import Exam from "./pages/Exam";
import NoticeBoard from "./pages/NoticeBoard";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

//utils
import MyRoute from './utils/Route';

import API from "./utils/API";

//styles
import './App.css';

function App(props) {

  const [user,setUser]=useState(API.isAuth());

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="Website for sharing company interview process and review.Helping junior's in choosing the right company and help them to placed in a company."/>
        <meta property="og:site_name" content="placestro | Website for sharing company interview process and review. placestro CSE placestro.Helping junior's in choosing the right company and help them to placed in a company."/>
        <meta property="og:type" content="placestro | Website for sharing company interview process and review.Helping junior's in choosing the right company and help them to placed in a company."/>
        <meta name="twitter:card" content="placestro | Website for sharing company interview process and review.Helping junior's in choosing the right company and help them to placed in a company."/>
        <meta property="og:site_name" content="placestro | Website for sharing company interview process and review.Helping junior's in choosing the right company and help them to placed in a company."/>
        <meta name="twitter:title" content="placestro | Website for sharing company interview process and review.Helping junior's in choosing the right company and help them to placed in a company."/>
        <title>placestro || Website for sharing company interview process and review || placestro </title>
      </Helmet>
      <Router>
      <Nav user={API.isAuth()}/>
        <Switch>
          <Route exact path="/" component={Home}/>
          
          <MyRoute.UserRestrictedRoute  path="/signin" component={()=>{return(<Signin setUser={setUser}/>)}}/>
          <MyRoute.UserRestrictedRoute  path="/signup" component={Signup} />
          
          <Route exact path="/companies" component={Companies} />
          <Route exact path="/company/reviews/:companyId"  component={()=>{return(<Reviews isLoggedin={API.isAuth()}/>)}}/>
          
          <Route exact path="/user/forgetPassword" component={ForgetPassword} />
          <Route exact path="/user/verifiy/email/:userId"  component={EmailVerified}/>
          <Route path="/user/reset/password/:passwordId" component={ResetPassword} />
                    
          <MyRoute.ProtectedRoute path="/user/profile"  component={UserProfile}/>
          <MyRoute.ProtectedRoute path="/user/exam"  component={Exam}/>
          <MyRoute.ProtectedRoute path="/user/notice"  component={NoticeBoard}/>

          <MyRoute.ProtectedRoute path="/user/addReview"  component={AddReview} />
          <MyRoute.ProtectedRoute path="/user/myReviews"  component={MyReviews} />
          <MyRoute.ProtectedRoute path="/user/edit/review/:reviewId"  
          component={EditReviews} />
          <MyRoute.ProtectedRoute path="/user/logout"  component={()=>{return(<Logout setUser={setUser}/>)}}/>
          
          <Route component={NotFound}/>
        </Switch>
       
      </Router>
    </>
  );
}

export default App;