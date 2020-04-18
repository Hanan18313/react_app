import React from 'react';
import { Descriptions, List, Typography } from 'antd'
import axios from 'axios'
import Common from '../public/js/Common'
import '../public/css/App.css'
export default class Draw extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: []
        }
    }

    componentDidMount() {
        this.Fetch()
    }
    Fetch = () => {
        axios({
            method: 'GET',
            url: Common.base_url('/exhibition/prizes')
        }).then(res => {
            console.log(res)
            this.setState({
                dataSource: res.data.data
            })
        })
    }
    render() {
        const { dataSource } = this.state
        return (
            <div>
                <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource = {dataSource}
                renderItem={item => <List.Item>
                    <Descriptions title={item.name}>
                        <Descriptions.Item label='奖品名称'>{item.name}</Descriptions.Item>
                        <Descriptions.Item label='价格'>￥{item.price}</Descriptions.Item>
                        <Descriptions.Item label='轮次'>{item.round}</Descriptions.Item>
                        <Descriptions.Item label='奖品描述'>{item.content}</Descriptions.Item>
                    </Descriptions>
                </List.Item>}
                ></List>
            </div>
            // <div style={{display:'flex', justifyContent:'center'}}>
            //     <div style={{width:'90%'}}>
            //         {dataSource.map(item => (
            //             <Descriptions key={item.id} title={item.name} info>
            //                 <Descriptions.Item label='奖品名'>{item.name}</Descriptions.Item>
            //                 <Descriptions.Item label='描述'>{item.content}</Descriptions.Item>
            //             </Descriptions>
            //         ))}
            //     </div>
            // </div>
        )
    }
}