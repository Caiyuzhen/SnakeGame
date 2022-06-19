//控制器(控制其他所有类）——————————————————————————————————————————————————————————————————————————————

import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'


class GameControl {

  //定义蛇、分数、食物三个属性
  snake:Snake
  food:Food
  scorePanel:ScorePanel
  direction:string=''//存储蛇的移动方向（也就是用户按下的按键的按键方向)

  constructor(){ //🔥🔥🔥在初始化的构造函数里，实例化三个模块！！
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()

    this.init()
  }

  //游戏的初始化方法，调用后就会开始游戏
  init():void{
    //🔥🔥🔥监听方向，( 一：触发按键事件，绑定按键方向), 给整个 document 绑定一个键盘事件
    document.addEventListener('keydown',this.keydownHandle.bind(this)) //当事件触发的时候，就会调用 keydownHandle 函数, 注意 this 的指向问题, 🔥🔥🔥🔥🔥通过 bind() 方法，把 this 的指向改为 GameControl 对象
  }

  //🔥🔥🔥🔥键盘的函数（一：获取按键的方向)
  keydownHandle(event:KeyboardEvent):void { //🌟传入键盘事件的 API ！！

    //需要检查一下键盘是否合法, 方向是不是键盘的上下左右
    
    this.direction = event.key //存储按下的方向
    console.log(event.key)   //获取 ⬆️ ⬇️ ⬅️ ➡️ 按键的名字: 打印出按下的按键(ArrowLeft\ArrowRight\ArrowUp\ArrowDown)
  }

}



export default GameControl
