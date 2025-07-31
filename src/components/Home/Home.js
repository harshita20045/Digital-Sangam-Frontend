import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Digital from "./Digital/Digital";
import Experience from "./Experience/Experience";
import Join from "./join/Join";
import Offers from "./Offers/Offers";
import Why from "./Why/Why";

function Home(){

  return <>
  <Header/>
 <Digital/>
  <Offers/>
   <Experience/>
  <Why/>
 <Join/>
   <Footer/> 
  </>
}
export default Home;