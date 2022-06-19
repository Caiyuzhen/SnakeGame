//定义蛇(属性+方法)——————————————————————————————————————————————————————————————————————————————

class Snake {
  
  //下面跟 constructor 都是在定义初始化的属性
  head: HTMLElement; //获取蛇头
  bodies:HTMLCollection//返回一个数组，包含蛇的所有身体(会实时的刷新)
  snackElement:HTMLElement//获取整个蛇的容器

  constructor() {
    //注意,querySelector 获取 id 需要加 #，getElementById 不需要
    this.snackElement = document.getElementById("snake")!              //获取蛇的容器
    this.head = document.querySelector('#snake > div') as HTMLElement;          //获取蛇头(因为 querySelector 是只取第一个) ｜ as HTMLElement 为类型断言， 因为 head: HTMLElement 是一类元素
    this.bodies = document.getElementById('snake')!.getElementsByTagName('div')  //获取剩下的蛇身，因为用 querySelector 是一次性的获取，每次添加完元素后都要重新获取，所以用 getElementById('snake')!.getElementsByTagName('div')
  }


  //🔥🔥获取蛇头的坐标
  get headX(): number {
    return this.head.offsetLeft
  }

  get headY(): number {
    return this.head.offsetTop
  }


  //🔥🔥修改蛇头坐标
  //X 轴位置
  set headX(value: number) {
    if(this.headX === value){//判断蛇的 X 轴位置是否没有发生变化
      return
    }
    //🔥判断蛇的 X 轴是否达到边界(撞墙了)
    if(value < 0 || value > 270){
      throw new Error('撞墙了')       //⚡️⚡️抛出错误，让 GameControl 知道蛇撞墙了
    }
    this.head.style.left = value + 'px'  //⚡️⚡️不撞墙的话，就改变蛇的位置
  }

  //Y 轴位置
  set headY(value: number) {
    if(this.headY === value){//判断蛇的 Y 轴位置是否没有发生变化
      return
    }
    if(value < 0 || value > 380){
      throw new Error('撞墙了')       //⚡️⚡️抛出错误，让 GameControl 知道蛇撞墙了
    }
    this.head.style.top = value + 'px'  //⚡️⚡️不撞墙的话，就改变蛇的位置
  }


  //🔥🔥🔥蛇身体增加一截的方法,相当于增加一个 <div></div>
  addBody():void {
    //向蛇的容器中添加一个 <div></div>
    this.snackElement.insertAdjacentHTML('beforeend', '<div></div>')//insertAdjacentElement 是插入元素的方法，第一个参数是向哪里添加元素，第二个是添加什么元素
  }
}


export default Snake;