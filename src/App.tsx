import { useEffect, useLayoutEffect, useReducer } from 'react';
import Timer from "./components/Timer";
import TodoList from "./API/TodoList";

//Порядок консольлогов

/**
 State update => repaint parent => repaint child;
 First render:
 1. console.log('parent: render');
 2. console.log('child render');
 3. console.log('child: layout effect');
 4. console.log('parent: layout effect');
 5. console.log('child: effect');
 7. console.log('parent: effect');
 8. console.log('child: cleanup layouteffect');
 9. console.log('parent: cleanup layouteffect');
 10. console.log('child: cleanup effect');
 11. console.log('parent: cleanup effect');
 **/

// export default function App() {
//   const [num, triggerRerender] = useReducer((state) => state++, 0);
//
//   (window as any).triggerRerender = triggerRerender;
//
//   console.log('parent: render');
//
//   useLayoutEffect(() => {
//     console.log('parent: layout effect');
//
//     return () => {
//       console.log('parent: cleanup layout effect');
//     }
//   }, [num]);
//
//   useEffect(() => {
//     console.log('parent: effect');
//
//     return () => {
//       console.log('parent: cleanup effect');
//     };
//   }, [num]);
//
//   return
//   <Child num={num}/>
// }
//
//
// type ChildProp = {
//   num: number
// }
//
// export function Child(props: ChildProp) {
//   const {num} = props;
//
//   console.log('child render');
//
//   useLayoutEffect(() => {
//     console.log('child: layout effect');
//     return function cleanUp () {
//       console.log('child: cleanup layout effect');
//     };
//   }, [num]);
//
//   useEffect(() => {
//     console.log('child: effect');
//     return function cleanUp () {
//       console.log('child: cleanup effect');
//     };
//   }, [num]);
//
//   return null
// }

export default function App() {
  return <TodoList key={1}/>
}
