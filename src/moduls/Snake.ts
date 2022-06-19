//定义蛇(属性+方法)——————————————————————————————————————————————————————————————————————————————

class Snake {
  
  //下面跟 constructor 都是在定义初始化的属性
  head: HTMLElement; //获取蛇头
  bodies:HTMLCollection//返回一个数组，包含蛇的所有身体(会实时的刷新)
  snackElement:HTMLElement//获取整个蛇的容器

  constructor() {
    this.snackElement = document.getElementById("#snack")!              //获取蛇的容器
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


  //🔥🔥设置蛇头坐标
  set headX(value: number) {
    this.head.style.left = value + 'px'
  }
  set headY(value: number) {
    this.head.style.top = value + 'px'
  }


  //🔥🔥🔥蛇身体增加一截的方法,相当于增加一个 <div></div>
  addBody():void {
    //向蛇的容器中添加一个 <div></div>
    this.snackElement.insertAdjacentHTML('beforeend', '<div></div>')//insertAdjacentElement 是插入元素的方法，第一个参数是向哪里添加元素，第二个是添加什么元素
  }
}


export default Snake;