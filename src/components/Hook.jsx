import React, { useState,  } from 'react';
import { Button } from 'antd'

const BaseButton = (params) =>{
    var [ count, setCount ] = useState(1) //参数1是初始化的值
    console.log(count)
    useEffect(() => {
        document.title = `点击Hook${count}次`
    },[count])
    return (
        <div>
            <div>{count}</div>
            <Button onClick={() =>{setCount(count=count+1)}}>Hook钩子</Button>
        </div>
    )
}

let _deps;
function useEffect(callback, depArray) {
    const hasNoDeps = !depArray;
    const hasChangedDeps = _deps
    ? !depArray.every((e1, i) => e1 === _deps[i]) : true;
    if(hasNoDeps || hasChangedDeps) {
        callback();
        _deps = depArray
    }
}

export default class Hook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            initCount: 0
        }
    }

    componentDidMount() {
       // useEffect()
    }
    render() {
        const props = this.props
        return (
            <div>
                <BaseButton props={props} state={this.state}></BaseButton>
            </div>
        )
    }
}