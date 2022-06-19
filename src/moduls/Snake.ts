//定义蛇(属性+方法)——————————————————————————————————————————————————————————————————————————————

class Snake {
  
  //下面跟 constructor 都是在定义初始化的属性
  head: HTMLElement; //获取蛇头
  bodies:HTMLCollection//返回一个数组，包含蛇的所有身体以及蛇头(会实时的刷新)
  snackElement:HTMLElement//获取整个蛇的容器

  constructor() {
    //注意,querySelector 获取 id 需要加 #，getElementById 不需要
    this.snackElement = document.getElementById("snake")!              //获取蛇的容器
    this.head = document.querySelector('#snake > div') as HTMLElement;          //获取蛇头(因为 querySelector 是只取第一个) ｜ as HTMLElement 为类型断言， 因为 head: HTMLElement 是一类元素
    // this.bodies = document.getElementById('snake')!.getElementsByTagName('div')  //获取剩下的蛇身，因为用 querySelector 是一次性的获取，每次添加完元素后都要重新获取，所以用 getElementById('snake')!.getElementsByTagName('div')
    this.bodies = this.snackElement.getElementsByTagName('div')
  }


  //🔥🔥获取蛇头的坐标
  get headX(): number { //headX 方法用来绑定蛇头的 X 坐标
    return this.head.offsetLeft
  }

  get headY(): number { //headY 方法用来绑定蛇头的 Y 坐标
    return this.head.offsetTop
  }


  //🔥🔥修改【蛇头】+【蛇身】坐标
  //修改 X 轴位置
  set headX(value: number) {  //⚡️⚡️⚡️⚡️set fn(value){} 将会自动获得 fn 的值
    if(this.headX === value){//判断蛇的 X 轴位置是否没有发生变化
      return
    }

    //🔥判断蛇的 X 轴是否达到边界(撞墙了)
    if(value < 0 || value > 270){
      throw new Error('撞墙了')       //⚡️⚡️抛出错误，让 GameControl 知道蛇撞墙了
    }
    console.log(value)

    //蛇在往左走时，不能往右掉头（不能反着掉头）反之亦然
      //判断蛇头跟第二节的坐标是否一样
      if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
        //如果掉头了，就向反方向继续移动（不给掉头)
        if(value > this.headX){ //如果只变大了，那就是👉向右掉的头，那就让它继续向左,不给它向右掉头
          value = this.headX - 10
        }else{
          value = this.headX + 10 //否则那就是👈向左掉的头，那就让它继续向右,不给它向左掉头
        }
      }
    
      //👇顺序不能写反！先动蛇身，否则蛇身第二节会叠在蛇头上！！！！
    this.moveBody() //⚡️⚡️不撞墙的话，就改变蛇身体的位置
    this.head.style.left = value + 'px'  //⚡️⚡️不撞墙的话，就改变蛇头的位置


    //X 坐标更新后，检查看是否撞到自己
  }





  //修改 Y 轴位置
  set headY(value: number) {  //⚡️⚡️⚡️⚡️set fn(value){} 将会自动获得 fn 的值
    if(this.headY === value){//判断蛇的 Y 轴位置是否没有发生变化
      return
    }

    if(value < 0 || value > 380){
      throw new Error('撞墙了')       //⚡️⚡️抛出错误，让 GameControl 知道蛇撞墙了
    }

    //蛇在往上走时，不能往下掉头（不能反着掉头）反之亦然
      //判断蛇头跟第二节的坐标是否一样
      if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
        //如果掉头了，就向反方向继续移动（不给掉头)
        if(value > this.headY){ //如果只变大了，那就是👉向右掉的头，那就让它继续向左,不给它向右掉头
          value = this.headY - 10
        }else{
          value = this.headY + 10 //否则那就是👈向左掉的头，那就让它继续向右,不给它向左掉头
        }
      }

    //👇顺序不能写反！先动蛇身，否则蛇身第二节会叠在蛇头上！！！！
    this.moveBody() //⚡️⚡️不撞墙的话，就改变蛇身体的位置
    this.head.style.top = value + 'px'  //⚡️⚡️不撞墙的话，就改变蛇头的位置


    //Y 坐标更新后，检查看是否撞到自己
    this.checkHeadBody()
  }


  



  //🔥🔥🔥蛇身体增加一截的方法,相当于增加一个 <div></div>
  addBody():void {
    //向蛇的容器中添加一个 <div></div>
    this.snackElement.insertAdjacentHTML('beforeend', '<div></div>')//insertAdjacentElement 是插入元素的方法，第一个参数是向哪里添加元素，第二个是添加什么元素
  }


  //⚡️⚡️移动蛇身体的方法(将后边的身体位置设置为前边的身体位置，从后往前改！否则会找不到前一节的位置)
  moveBody():void {
        /*
        *   将后边的身体设置为前边身体的位置
        *       举例子：
        *           第4节 = 第3节的位置
        *           第3节 = 第2节的位置
        *           第2节 = 蛇头的位置
        */
    // 遍历获取所有的身体
    for(let i = this.bodies.length - 1; i > 0 ; i--){ //从后往前改
      
      //获取蛇前一节【i-1】身体的位置
      let preBodyX = (this.bodies[i-1] as HTMLElement).offsetLeft; //需要类型断言一下！确定是 HTML 元素，as HTMLElement
      let preBodyY = (this.bodies[i-1] as HTMLElement).offsetTop;  //需要类型断言一下！确定是 HTML 元素，as HTMLElement

      (this.bodies[i] as HTMLElement).style.left = preBodyX + 'px'; //当前节【i】等于前一节【i-1】的位置
      (this.bodies[i] as HTMLElement).style.top = preBodyY + 'px'; //当前节【i】等于前一节【i-1】的位置

      // console.log(this.bodies[i]);
      console.log(this.bodies.length);
    }
  }


  //👀检查是否撞到自己了(记得调用这个方法，判断时机为)
  checkHeadBody():void { 
    //⚡️获取所有的【蛇身体】，看是否和【蛇头】发生重叠
    for(let i = 1; i < this.bodies.length; i++) {//排除蛇头 
      
      let snakeBody = this.bodies[i] as HTMLElement //定义蛇身体所有元素的变量
      if(this.headX === snakeBody.offsetLeft && this.headY === snakeBody.offsetTop){ //🔥🔥🔥说明蛇头跟蛇身重叠了
        //游戏结束
        throw new Error("撞到自己了~")
      }
    }
  }
}


export default Snake;