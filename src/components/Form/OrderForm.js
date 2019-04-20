import React, { Component } from 'react';

import "antd/dist/antd.css";
import { Tabs, Row, Col, Form, Input, Button, Icon } from 'antd';

import orderType from './orderType';
import './OrderForm.css';
import TradeReport from './TradeReport';

class OrderForm extends Component {
    
    state = {
        qouteAsset: 'ETH',
        baseAsset: 'BTC',
        formIsValid: false,
        isAuthenticated: false,
        accountBalance: 10,
        basePrice: 0.031839,
        amount:0,
        total:0,
        stop:0,
        limit:0
    }

    tradeAmountHandler = (percentage) => {
        let total = this.state.accountBalance * percentage;
        if(this.state.basePrice){
            let amount = total / this.state.basePrice;
            this.setState({amount: amount});
        }
        this.setState({total: total});
    }


    render () {
        const TabPane = Tabs.TabPane;
        const FormItem = Form.Item;

        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          };
        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 4 },
        }

        const mktPricePlaceholder = "Market Price - " + this.state.baseAsset;

        const percentageBtn = (
           
            <Row>
                <Col style={{marginLeft:'75px'}}>
                    <Button size={'small'} onClick={() => this.tradeAmountHandler(0.25)}>25%</Button> &nbsp;
                    <Button size={'small'} onClick={() => this.tradeAmountHandler(0.5)} style={{marginLeft:'6px'}}>50%</Button> &nbsp;
                    <Button size={'small'} onClick={() => this.tradeAmountHandler(0.75)} style={{marginLeft:'6px'}}>75%</Button> &nbsp; 
                    <Button size={'small'} onClick={() => this.tradeAmountHandler(1)} style={{marginLeft:'6px'}}>100%</Button>
                </Col>
            </Row>
        );

        let buttonItem = (
            <FormItem {...buttonItemLayout} style={{marginLeft: '10px'}}>
                <Button type="primary" ghost>Submit</Button>
            </FormItem>
        );

        if (!this.state.isAuthenticated) {
            buttonItem = (
                <FormItem>
                    <Row>
                        <div className="ant-col-14 btn-redo">
                            <a href=''>
                                Log in
                            </a>
                            &nbsp; Or &nbsp;
                            <a href=''>
                                Register Now
                            </a>
                        </div>
                    </Row>
                </FormItem>
            );
        }

        return (

         
            <div className="card-container">
          
                <Tabs type="card" style={{backgroundColor:'#262D32', color:'white'}}>
                    <TabPane tab={orderType.limit} key="1">
                        <Row>
                            <Col md={5}>
                                <Form layout='horizontal' onSubmit={this.handleSubmit}>
                                    <Row style={{marginBottom: '8px'}}>
                                        <Col md={{span:6, offset: 2}}><strong>Buy {this.state.qouteAsset}</strong> </Col>
                                        <Col md={{span: 6, offset: 4}}>
                                            <Row type="flex" justify="end">
                                                <Col span={3}><strong><Icon type="wallet" /></strong></Col>
                                                <Col span={9}><strong>-{this.state.qouteAsset}</strong></Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <FormItem label="Price" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}}>
                                        <Input type='number' name='price' key='buyPrice' placeholder={this.state.baseAsset} />
                                    </FormItem>
                                    <FormItem label="Amount" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}}>
                                        <Input type='number' name='amount' key='buyAmount' placeholder={this.state.qouteAsset} />
                                    </FormItem>
                                    {percentageBtn}
                                    <FormItem label="Total" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}}>
                                        <Input type='number' name='total' key='buyTotal' placeholder={this.state.baseAsset} />
                                    </FormItem>
                                    
                                    { buttonItem }
                                </Form>
                            </Col>
                            <Col md={1} style={{borderLeft: '1px solid #ccc', height:'200px'}}></Col>
                            <Col md={5}>
                                <Form layout='horizontal' onSubmit={this.handleSubmit}>
                                    <Row style={{marginBottom: '8px'}}>
                                        <Col md={{span:6, offset: 2}}><strong>Sell {this.state.qouteAsset}</strong> </Col>
                                        <Col md={{span: 6, offset: 4}}>
                                            <Row type="flex" justify="end">
                                                <Col span={3}><strong><Icon type="wallet" /></strong></Col>
                                                <Col span={9}><strong>-{this.state.qouteAsset}</strong></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <FormItem label="Price" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='price' key='sellPrice' placeholder={this.state.baseAsset} />
                                    </FormItem>
                                    <FormItem label="Amount" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='amount' key='sellAmount' placeholder={this.state.qouteAsset} />
                                    </FormItem>
                                    { percentageBtn }
                                    <FormItem label="Total" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='total' key='sellTotal' placeholder={this.state.baseAsset} />
                                    </FormItem>
                                    { buttonItem }
                                </Form>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={orderType.market} key="2">
                        <Row>
                            <Col md={5}>
                                <Form layout='horizontal' onSubmit={this.handleSubmit}>
                                    <Row style={{marginBottom: '8px'}}>
                                        <Col md={{span:6, offset: 2}}><strong>Buy {this.state.qouteAsset}</strong> </Col>
                                        <Col md={{span: 6, offset: 4}}>
                                            <Row type="flex" justify="end">
                                                <Col span={3}><strong><Icon type="wallet" /></strong></Col>
                                                <Col span={9}><strong>-{this.state.qouteAsset}</strong></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <FormItem label="Price" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='price' key='buyPrice' disabled='true' placeholder={mktPricePlaceholder} />
                                    </FormItem>
                                    <FormItem label="Amount" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='amount' key='buyAmount' placeholder={this.state.qouteAsset} />
                                    </FormItem>
                                    { buttonItem }
                                </Form>
                            </Col>
                            <Col md={1} style={{borderLeft: '1px solid #ccc', height:'200px'}}></Col>
                            <Col md={5}>
                                <Form layout='horizontal' onSubmit={this.handleSubmit}>
                                    <Row style={{marginBottom: '8px'}}>
                                        <Col md={{span:6, offset: 2}}><strong>Sell {this.state.qouteAsset}</strong> </Col>
                                        <Col md={{span: 6, offset: 4}}>
                                            <Row type="flex" justify="end">
                                                <Col span={3}><strong><Icon type="wallet" /></strong></Col>
                                                <Col span={9}><strong>-{this.state.qouteAsset}</strong></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <FormItem label="Price" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='price' key='sellPrice'  disabled='true' placeholder={mktPricePlaceholder} />
                                    </FormItem>
                                    <FormItem label="Amount" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='amount' key='sellAmount' placeholder={this.state.qouteAsset} />
                                    </FormItem>
                                    { buttonItem }
                                </Form>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={orderType.stopLimit} key="3">
                        <Row>
                            <Col md={5}>
                                <Form layout='horizontal' onSubmit={this.handleSubmit}>
                                    <Row style={{marginBottom: '8px'}}>
                                        <Col md={{span:6, offset: 2}}><strong>Buy {this.state.qouteAsset}</strong> </Col>
                                        <Col md={{span: 6, offset: 4}}>
                                            <Row type="flex" justify="end">
                                                <Col span={3}><strong><Icon type="wallet" /></strong></Col>
                                                <Col span={9}><strong>-{this.state.qouteAsset}</strong></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <FormItem label="Stop" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='stop' key='stopPrice' placeholder={this.state.baseAsset} />
                                    </FormItem>
                                    <FormItem label="Limit" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='limit' key='limitPrice' placeholder={this.state.baseAsset} />
                                    </FormItem>
                                    <FormItem label="Amount" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='amount' key='buyAmount' placeholder={this.state.qouteAsset} />
                                    </FormItem>
                                    { percentageBtn }
                                    <FormItem label="Total" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='total' key='buyTotal' placeholder={this.state.baseAsset} />
                                    </FormItem>
                                    { buttonItem }
                                </Form>
                            </Col>
                            <Col md={1} style={{borderLeft: '1px solid #ccc', height:'200px'}}></Col>
                            <Col md={5}>
                                <Form layout='horizontal' onSubmit={this.handleSubmit}>
                                    <Row style={{marginBottom: '8px'}}>
                                        <Col md={{span:6, offset: 2}}><strong>Sell {this.state.qouteAsset}</strong> </Col>
                                        <Col md={{span: 6, offset: 4}}>
                                            <Row type="flex" justify="end">
                                                <Col span={3}><strong><Icon type="wallet" /></strong></Col>
                                                <Col span={9}><strong>-{this.state.qouteAsset}</strong></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <FormItem label="Stop" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='stop' key='stopPrice' placeholder={this.state.baseAsset} />
                                    </FormItem>
                                    <FormItem label="Limit" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='limit' key='limitPrice' placeholder={this.state.baseAsset} />
                                    </FormItem>
                                    <FormItem label="Amount" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='amount' key='sellAmount' placeholder={this.state.qouteAsset} />
                                    </FormItem>
                                    { percentageBtn }
                                    <FormItem label="Total" {...formItemLayout} style={{marginBottom: '4px', marginLeft: '10px'}} >
                                        <Input type='number' name='total' key='sellTotal' placeholder={this.state.baseAsset} />
                                    </FormItem>
                                    { buttonItem }
                                </Form>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>

                <TradeReport />
            </div>
        );
    }
}

export default OrderForm;