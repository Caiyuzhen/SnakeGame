import './style/index.less' //引入样式
import GameControl from './moduls/GameControl'



//🌟主渲染页——————————————————————————————————————————————————————————————————————————————

const GC = new GameControl()//因为 GameControl 控制着所有模块，所以一 new 它的话，相当于就开始游戏了

setInterval(() =>{
  console.log(GC.direction)
},1000)