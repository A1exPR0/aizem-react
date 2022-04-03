import gsap from 'gsap';
import { NavLink,useNavigate,useLocation } from 'react-router-dom'
import styles from "./Navigation.module.scss"
import cardStyles from '../Card.module.scss';

const routes=[
  {path:"/", name:"Главная", i:0},
  {path:"/projects", name:"Проекты", i:1},
  {path:"/text-test", name:"Тест текста", i:2},

];


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
          gsap.to(q("."+cardStyles.card),{
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
        case "/text-test":
          gsap.to([q("h2"),q(".page")],{
            opacity:0,
            x:50,
            stagger:0.2,
            // rotateX:90,
            // height:0,
            onComplete:()=>{
                navigate(dest);
                // console.log("complete projects exit");
            }
        });
          break;
          
        default:
          navigate(dest);
          break;
      }

    }
   }
// console.log(styles);

  return (
    <div className={styles.nav}>
      {/* {routes.forEach(route => (
        <NavLink key={route.i} onClick={(e)=>{pageChange(e,route.path);}} to={route.path}>{route.name}</NavLink>
      ))} */}
    {/* <NavLink onClick={(e)=>{pageChange(e,"/");}} to='/' >Главная</NavLink>
    <NavLink onClick={(e)=>{pageChange(e,"/projects");}} to='/projects'>Проекты</NavLink> */}
    
    {routes.map((route)=>(
      <NavLink className={({ isActive }) => styles.a +" "+(isActive ? styles.active : "")}activeClassName={styles.active} key={route.i} onClick={(e)=>{pageChange(e,route.path);}} to={route.path}>{route.name}</NavLink>
    ))}
    
    </div>
  )
}

export default Navigation

// className=