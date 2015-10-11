import React from 'react';
import { Checkbox, message, Alert, Timeline, Radio } from 'antd';

class LoginForm extends React.Component {
    render() {
        return (
            <form className="ant-form-inline">
                <div className="ant-form-item">
                    <label htmlFor="userName">账户：</label>
                    <input className="ant-input" type="text" id="userName" placeholder="请输入账户名"/>
                </div>
                <div className="ant-form-item">
                    <label htmlFor="password2">密码：</label>
                    <input className="ant-input" type="password" id="password2" placeholder="请输入密码"/>
                </div>
                <div className="ant-form-item">
                    <label className="ant-checkbox-inline">
                        <Checkbox /> 记住我
                    </label>
                </div>
                <input type="submit" className="ant-btn ant-btn-primary" value="登 录"/>
            </form>
        );
    }
}

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {events: [{id: 0, title: 'essay due'}]};
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.showErrInfo = this.showErrInfo.bind(this);
        this.showSuccInfo = this.showSuccInfo.bind(this);
    }

    handleRadioChange(e) {
        console.log('radio checked:' + e.target.value);
    }

    showSuccInfo() {
        message.success('这是一条成功的提示');
    }

    showErrInfo() {
        message.error('这是一条失败的提示这是一条失败的提示这是一条失败的提示');
    }

    render() {

        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;

        return (
            <div>
                <h2>Calendar</h2>
                <ul>
                    {this.state.events.map(event => (
                        <li key={event.id}>{event.title}</li>
                    ))}
                </ul>
                <div className="row">
                    <div className="col-offset-12 col-12">
                        <LoginForm />
                    </div>
                </div>

                <button className="ant-btn ant-btn-primary" onClick={this.showSuccInfo}>显示成功提示</button>
                <button className="ant-btn ant-btn-primary" onClick={this.showErrInfo}>显示失败提示</button>

                <div>
                    <Alert message="成功提示的文案"
                           description="成功提示的辅助性文字介绍成功提示的辅助性文字介绍成功提示的辅助性文字介绍成功提示的辅助性文字介绍"
                           type="success"/>
                    <Alert message="消息提示的文案"
                           description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
                           type="info"/>
                    <Alert
                        message="警告提示的文案"
                        description="警告提示的辅助性文字介绍警告提示的辅助性文字介绍"
                        type="warn"/>
                    <Alert
                        message="错误提示的文案"
                        description="错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍"
                        type="error"/>
                </div>

                <Timeline>
                    <Timeline.Item color="green">创建服务现场 2015-09-01</Timeline.Item>
                    <Timeline.Item color="green">创建服务现场 2015-09-01</Timeline.Item>
                    <Timeline.Item color="red">
                        <p>初步排除网络异常1</p>

                        <p>初步排除网络异常2</p>

                        <p>初步排除网络异常3 2015-09-01</p>
                    </Timeline.Item>
                    <Timeline.Item>
                        <p>技术测试异常1</p>

                        <p>技术测试异常2</p>

                        <p>技术测试异常3 2015-09-01</p>
                    </Timeline.Item>
                </Timeline>

                <RadioGroup onChange={this.handleRadioChange} defaultValue="a">
                    <RadioButton value="a">杭州</RadioButton>
                    <RadioButton value="b">上海</RadioButton>
                    <RadioButton value="c">北京</RadioButton>
                    <RadioButton value="d">成都</RadioButton>
                </RadioGroup>

            </div>
        )
    }
}

export default LoginForm
export default Calendar
