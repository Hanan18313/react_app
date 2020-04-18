import React from 'react'
import { Button } from 'antd'
import '../../public/css/App.css'
import Axios from 'axios';
import common from '../../public/js/Common';

export default class SignUpList extends React.Component {


    componentDidMount() {
        this.Fetch()
    }
    Fetch(params) {
        let token = 'eyJkYXRhIjp7InVzZXJJZCI6IjE4MDIiLCJwYXNzV29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIn0sImNyZWF0ZWQiOjE1NjY0MzM2MTg4NDAsImV4cCI6MzYwMDAwMH0=.y/J1AdBSpuTChC54S8pRV0Uibgi1sSTrwsV06PIG3Zs='
        Axios.get(common.base_url('/actionTrain/signUpList'),{
            params: params,
            headers: {
                'Content-Type':'application/json',
                'token': token
            }
        }).then(res => {
           // console.log(res)
        })
    }

    render() {
        return(
            <Button type='primary' >Annie</Button>
        )
    }
}