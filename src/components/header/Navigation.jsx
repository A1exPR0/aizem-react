import gsap from 'gsap';
import { NavLink,useNavigate,useLocation } from 'react-router-dom';
import styles from "./Navigation.module.scss";
import cardStyles from '../Card.module.scss';

const routes=[
  {path:"/", name:"Главная", i:0, animObjs:[".page"]},
  {path:"/projects", name:"Проекты", i:1, animObjs:["."+cardStyles.card]},
  {path:"/text-test", name:"Тест текста", i:2,animObjs:["h2",".page"]}
];


function Navigation(props) {

  let navigate=useNavigate();
  let location=useLocation();
  const q = gsap.utils.selector(props.appref);
  
  function getAnimQuerry(arr2,arr1,i){
    if(arr1[i].animObjs.length>1){
      arr1[i].animObjs.forEach((item,i)=>{
        arr2[i]=q(item);
        })
      }
    if(arr1[i].animObjs.length==1)
      arr2=q(arr1[i].animObjs[0])

      return arr2;
  }

   const pageChange=(e,dest)=>{

    if(!e.target.classList.contains(styles.active)){ 
      let querry=[];
      let i=-1;
      e.preventDefault();
      switch (location.pathname) {
        case routes[0].path:  // путь главной страницы
         i=0;
         querry=getAnimQuerry(querry,routes,i);
          //анимация ухода с главной страницы
          gsap.to(querry,{
            opacity:0,
            y:50,
            // stagger:0.1,
            // rotateY:90,
            // height:0,
            onComplete:()=>{
                navigate(dest);
                // console.log("complete main exit");
            }
        });
          break;
        case routes[1].path:
         i=1;
         querry=getAnimQuerry(querry,routes,i);
          gsap.to(querry,{
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
        case routes[2].path:
          i=2;
          querry=getAnimQuerry(querry,routes,i);
                    
            // [q("h2"),q(".page")]
          gsap.to(querry,{
            opacity:0,
            x:50,
            stagger:0.2,
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
      <img className={styles.logo} src='http://localhost:1337/uploads/AIZEM logo.png'></img>     
      <div>
        {routes.map((route)=>(
          <NavLink 
              className={({ isActive }) => styles.a +" "+(isActive ? styles.active : "")} 
              key={route.i} 
              onClick={(e)=>{pageChange(e,route.path);}} 
              to={route.path}>
                {route.name}
          </NavLink>
        ))}
      </div> 
    </div>
  )
}

export default Navigation
