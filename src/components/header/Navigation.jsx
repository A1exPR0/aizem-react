import gsap from 'gsap';
import { NavLink,useNavigate,useLocation } from 'react-router-dom'



function Navigation(props) {

  let navigate=useNavigate();
  let location=useLocation();
  const q = gsap.utils.selector(props.appref);
  
   const pageChange=(e,dest)=>{

    if(!e.target.classList.contains("active")){
      e.preventDefault();
      switch (location.pathname) {
        case "/":
          gsap.to([q(".page"),q(".page")],{
            opacity:0,
            y:50,
            stagger:0.1,
            // rotateX:90,
            // height:0,
            onComplete:()=>{
                navigate(dest);
                // console.log("complete main exit");
            }
        });
          break;
        case "/projects":
          gsap.to(q(".card"),{
            opacity:0,
            x:50,
            stagger:0.1,
            // rotateX:90,
            // height:0,
            onComplete:()=>{
                navigate(dest);
                // console.log("complete projects exit");
            }
        });
          break;
          
        default:
          break;
      }

    }
   }


  return (
    <div>
    <NavLink onClick={(e)=>{pageChange(e,"/");}} to='/' >Главная</NavLink>
    <NavLink onClick={(e)=>{pageChange(e,"/projects");}} to='/projects'>Проекты</NavLink>
    </div>
  )
}

export default Navigation