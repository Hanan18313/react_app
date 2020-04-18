import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Common from '../public/js/Common';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import ActionTrain_signUpList from '../components/ActionTrain/SignUpList';
import ActivityInfo from '../components/ActionTrain/activityInfo';
import Curve from '../components/ActionTrain/Curve'
import Home from '../components/Home';
import Hook from './Hook'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



export default class App extends React.Component {
    rootSubmenuKeys = [];
    state = {
        openKeys: ['index'],
        current:[],
        MenuSider:[]
    };
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    handleClick(e) {
        
    }
    Fetch(){
       // let token = window.top.sessionStorage.getItem('token');
        let token = 'eyJkYXRhIjp7InVzZXJJZCI6IjE4MDIiLCJwYXNzV29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIn0sImNyZWF0ZWQiOjE1NjYzNDc1OTA4NTksImV4cCI6MzYwMDAwMH0=.VLzKQ6BX6ATvVb4849BTC5/pyyxY0/Fh54Y+3NwUbZs='
        axios.get(Common.base_url('/MenuSiderList'),{
            headers:{
                "Content-Type":"application/json",
                'token':token
            },
            
        }).then(menu => {
            if(menu.status === 200){
                //console.log(menu)
                this.setState({
                    MenuSider:menu.data
                })
                menu.data.forEach((item,index) => {
                    this.rootSubmenuKeys.push(item.key)
                })
            }
        })
    }
    componentWillMount() {
        this.Fetch()
    }

    render () {
       // console.log(this)
        return (
            <div>
                <Layout>
                    <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                        mode="inline"
                        defaultSelectedKeys={['index']}
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        onClick={this.handleClick}
                        style={{ height: '100%', borderRight: 0 }}
                        >
                            {this.state.MenuSider.map(menu => {
                                if(menu.subMenus.length === 0){
                                    return (
                                        <Menu.Item
                                        key={menu.key}
                                        >
                                            <Link to={menu.path}>{menu.text}</Link>
                                        </Menu.Item>
                                    )
                                }else{
                                    return (
                                        <SubMenu
                                        key={menu.key}
                                        title={
                                            <span>{menu.text}</span>
                                        }
                                        >
                                            {menu.subMenus.map(subMenu => {
                                                return (
                                                    <Menu.Item
                                                    key={subMenu.key}
                                                    >
                                                        <Link to={subMenu.path}>{subMenu.text}</Link>
                                                    </Menu.Item>
                                                )
                                            })}
                                        </SubMenu>
                                    )
                                }
                            })}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 0 24px 24px' }}>
                        <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 700,
                        }}
                        >
                            <Switch>
                                <Route path='/index' component={Hook}/>
                                {/* <Route path='/index' component={Home}/>
                                <Route path='/action/controller' component={Curve} />
                                <Route path='/actionTrain/activity_info' component={ActivityInfo} /> */}
                                <Redirect from='/*' to='/index' />
                            </Switch>
                        </Content>
                    </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}