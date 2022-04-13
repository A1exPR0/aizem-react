
import {Route,Routes} from 'react-router-dom';
import React from 'react'
import Home from './Home';
import Projects from './Projects';
import TextTest from '../components/TextTest';

const routes=[
  {path:"/", name:"Главная", Component:Home,i:0},
  {path:"/projects", name:"Проекты", Component:Projects,i:1},
  {path:"/text-test", name:"Текст тест", Component:TextTest,i:2},
];

function Pages(props) {


  return (

    <Routes>
      {routes.map(({path,Component,i})=>(
        <Route key={i} path={path} element={<Component appref={props.appref}/>}/>
      ))}
    </Routes>

  )
}

export default Pages