import './style/index.less' //引入样式
import GameControl from './moduls/GameControl'



//🌟主渲染页——————————————————————————————————————————————————————————————————————————————


//总体过程（思路，面向对象，对象里的属性跟方法都封装到对象里，然后通过 GameControl 去控制跨对象的行为）s
  //搭建 Food 类
  //搭建 ScorePanel 类
  //搭建 Snake 类
  //搭建 GameControl 类（键盘事件去控制所有类）
  //通过 GameControl 去使蛇移动
  //判断蛇是否撞墙
  //让吃到食物能够生长\分数增加
  //让蛇的子节点能够移动


const GC = new GameControl()//因为 GameControl 控制着所有模块，所以一 new 它的话，相当于就开始游戏了

setInterval(() =>{
  console.log(GC.direction)
},1000)