//控制器(核心 ts，用来控制其他所有类）——————————————————————————————————————————————————————————————————————————————

import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'


class GameControl {

  //定义蛇、分数、食物三个属性
  snake:Snake
  food:Food
  scorePanel:ScorePanel
  direction:string=''//存储蛇的移动方向（也就是用户按下的按键的按键方向)
  isLive:boolean = true //判断游戏是否结束


  constructor(){ //🔥🔥🔥在初始化的构造函数里，实例化三个模块！！
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()

    //🌟让蛇移动的方法二：初始化时反复调自己
    // setInterval(()=>{ //反复的调用，让蛇去移动, 执行 moveSnake() 方法
    //   this.init()
    // },100)

    //🌟让蛇移动的方法二：在函数内每隔 X 秒，自己调自己
    this.init()
  }



  //游戏的初始化方法，调用后就会开始游戏
  init():void{
    //🔥🔥🔥监听方向，( 一：触发按键事件，绑定按键方向), 给整个 document 绑定一个键盘事件
    document.addEventListener('keydown',this.keydownHandle.bind(this)) //当事件触发的时候，就会调用 keydownHandle 函数, 注意 this 的指向问题, 🔥🔥🔥🔥🔥通过 bind() 方法，把 this 的指向改为 GameControl 对象

    //⚡️⚡️⚡️执行 moveSnake() 方法，让蛇开始移动
    this.moveSnake()
  }



  //🔥🔥🔥🔥键盘的函数（一：获取按键的方向)
  keydownHandle(event:KeyboardEvent):void { //🌟传入键盘事件的 API ！！

    //需要检查一下键盘是否合法, 方向是不是键盘的上下左右

    this.direction = event.key //存储按下的方向
    console.log(event.key)   //获取 ⬆️ ⬇️ ⬅️ ➡️ 按键的名字: 打印出按下的按键(ArrowLeft\ArrowRight\ArrowUp\ArrowDown)
    // this.moveSnake() //按一次执行一次
  }



  //移动蛇的方法·——————————————————————————————————————————————————————————————————————————————
  moveSnake():void{
    //根据 this.direction 来改变蛇的方向
        //向上 top 减少
        //向下 bottom 增加
        //向左 left 减少
        //向右 right 增加

    //🔥🔥🔥获取蛇现在的坐标
    let headX = this.snake.headX
    let headY = this.snake.headY

    //🔥🔥🔥计算值(⚡️蛇向哪边走，然后通过循环的方法来一直走）：判断 this.direction 的 4 种 X 2 情况来计算改变的值(因为要包含 window 机，window 机是 Up / Down...)
    switch( this.direction ){
      case "ArrowUp": 
      case "Up": 
        headY -= 10;  //向上就是 Y 减小, 每次移动一格为 10
        break;
      case "ArrowDown":
      case "Down":
        headY += 10;  //向下就是 Y 增加, 每次移动一格为 10
        break;
      case "ArrowLeft":
      case "Left":
        headX -= 10;  //向左就是 X 减小, 每次移动一格为 10
        break;
      case "ArrowRight":
      case "Right":
        headX += 10;  //向右就是 X 增加, 每次移动一格为 10
        break;
    }


    //判断是否吃到了食物，🌟步骤二：则调用下面函数的返回值并传入最新的蛇头位置的数据🍜🍜
    this.checkEatFood(headX,headY)


    //🌟判断如果撞墙了则游戏结束，try、catch 配合组件 throw new Error 的方式很常用！！🚀🚀
    try{
        //🔥🔥🔥根据上面计算的值来修改蛇的坐标
        this.snake.headX = headX //修改蛇头的 X 坐标
        this.snake.headY = headY //修改蛇头的 Y 坐标
    }catch (e:any){
        alert(e.message);//捕获异常后就说明游戏结束，弹出提示信息
        this.isLive = false//将 isLive 设置为 false，让蛇不动
    }


    //🌟🌟🌟让蛇移动的方法二：在函数内每隔 X 秒，自己调自己
    this.isLive && setTimeout( //🔥🔥🔥this.isLive && XXX 表示当条件为 true 才开启，否则就不开启！
      this.moveSnake.bind(this)
    ,200 - (this.scorePanel.level - 1 )*20 )//记得绑定回调函数的 this 指向, 然后随着等级的提升，速度变快,于是用时间差 300 来 - (this.scorePanel.level - 1 )*30
  }


  //判断蛇是否吃到了食物 (🔥🔥思路：检查蛇的新坐标是否和食物重叠了🍜🍜)
  checkEatFood(headX:number, headY:number){ 
    if(headX === this.food.x && headY === this.food.y){ //判断是否吃到了食物，🌟步骤一：返回一个布尔值（都一样才会返回布尔值 true）
      console.log('吃到食物了');
      //食物的位置需要重置
      this.food.change()
      //增加分数
      this.scorePanel.addScore()
      //增加蛇的长度
      this.snake.addBody()
    }
  }
}



export default GameControl
