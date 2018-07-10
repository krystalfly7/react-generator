import React, { Component } from 'react';
import { Form, Button, Table, Input, Modal, message } from 'antd';
import './style.less';
import style from './style.scss';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
          test: 'test page'
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="testless">{this.state.test}</div>
            </div>
        );
    }
}

export default Form.create()(Test);
