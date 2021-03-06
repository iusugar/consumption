// 防抖
// export function debounce(func, wait, immediate) {
//   let timeout, args, context, timestamp, result

//   const later = function() {
//     // 据上一次触发时间间隔
//     const last = +new Date() - timestamp

//     // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
//     if (last < wait && last > 0) {
//       timeout = setTimeout(later, wait - last)
//     } else {
//       timeout = null
//       // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
//       if (!immediate) {
//         result = func.apply(context, args)
//         if (!timeout) context = args = null
//       }
//     }
//   }

//   return function(...args) {
//     context = this
//     timestamp = +new Date()
//     const callNow = immediate && !timeout
//     // 如果延时不存在，重新设定延时
//     if (!timeout) timeout = setTimeout(later, wait)
//     if (callNow) {
//       result = func.apply(context, args)
//       context = args = null
//     }

//     return result
//   }
// }

export function debounce(func, delay) {
  let timeout
  return function () {
    clearTimeout(timeout) // 如果持续触发，那么就清除定时器，定时器的回调就不会执行。
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}

// export function throttle(fn, t = 500) {
//   let last;
//   let timer;
//   return function () {
//     let th = this;
//     let args = arguments;
//     let now = +new Date();
//     if (last && now - last < interval) {
//       clearTimeout(timer);
//       timer = setTimeout(function () {
//         last = now;
//         fn.apply(th, args);
//       }, t);
//     } else {
//       last = now;
//       fn.apply(th, args);
//     }
//   }
// }
