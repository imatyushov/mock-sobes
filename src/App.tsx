import React, {memo, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

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
//   return <Child num={num}/>
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

//memo

//useEffect вызывался один раз, но handler всегда актуальный
function WindowEvent({event, handler, options}: {event: string, handler: EventListener, options?: EventListenerOptions}) {
    // const ref = useRef(handler);
    // console.log(ref.current)
    // useLayoutEffect(() => {
    //     ref.current = handler;
    // }, [handler])
    // useEffect(() => {
    //     const fn = (arg:Event) => ref.current(arg)
    //     console.log('use effect');
    //     window.addEventListener(event, fn, options);
    //     return () => {
    //         window.removeEventListener(event, fn, options);
    //     }
    // }, [event, options])

    useEffect(() => {
        console.log('use effect');
            window.addEventListener(event, handler, options);
            return () => {
                window.removeEventListener(event, handler, options);
            }
    }, [event, handler, options])
    return null;
}

interface ButtonProps {
    onClick: React.MouseEventHandler;
}

const Button = memo(function Button(props: ButtonProps) {
    const {onClick} = props;
    console.log('button render')
    return <button onClick={onClick}>Click me</button>
});

export default function App() {
    const [isVisible, setIsVisible] = useState(false);
    // const ref = useRef(isVisible)

    const onClick = useCallback(() => {
        setIsVisible(!isVisible);
    }, [isVisible])

    // const onClick = useCallback(() => {
    //     ref.current = !ref.current
    //     setIsVisible(ref.current);
    // }, [])

    return <>
        <Button onClick={onClick} />
        {/*<WindowEvent event='click' handler={() => console.log('click')}/>*/}
        {isVisible && (
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, optio!</div>
        )}
    </>
}
