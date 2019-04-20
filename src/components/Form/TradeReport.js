import React, { Component } from 'react';
import "antd/dist/antd.css";
import { Tabs, Row, DatePicker, Button, Form } from 'antd';

import openOrderTable from './TableData/openOrderTableData';
import orderHistoryTable from './TableData/orderHistoryTableData';
import tradeHistoryTable from './TableData/tradeHistoryTableData';
import fundsTable from './TableData/FundsTableData';
import FormTable from './UI/FormTable';

class TradeReport extends Component {

     state = {
         startValue: null,
         endValue: null,
         endOpen: false,
     };

     disabledStartDate = (startValue) => {
         const endValue = this.state.endValue;
         if (!startValue || !endValue) {
             return false;
         }
         return startValue.valueOf() > endValue.valueOf();
     }

     disabledEndDate = (endValue) => {
         const startValue = this.state.startValue;
         if (!endValue || !startValue) {
             return false;
         }
         return endValue.valueOf() <= startValue.valueOf();
     }

     onChange = (field, value) => {
         this.setState({
             [field]: value,
         });
     }

     onStartChange = (value) => {
         this.onChange('startValue', value);
     }

     onEndChange = (value) => {
         this.onChange('endValue', value);
     }

     handleStartOpenChange = (open) => {
         if (!open) {
             this.setState({
                 endOpen: true
             });
         }
     }

     handleEndOpenChange = (open) => {
         this.setState({
             endOpen: open
         });
     }

    historyPeriodHandler = (period) => {
        console.log(period);
    }

    render () {

        const TabPane = Tabs.TabPane;
        const FormItem = Form.Item;
        const startValue = this.state.startValue;
        const endValue = this.state.endValue;
        const endOpen = this.state.endOpen;

        const historyPeriodForm = (
            <Row>
                <Form layout='inline'>
                    <FormItem>
                        <Button size={'small'} onClick={() => this.historyPeriodHandler(1)} style={{marginLeft:'6px'}}>1 Day</Button> &nbsp;
                        <Button size={'small'} onClick={() => this.historyPeriodHandler(7)} style={{marginLeft:'6px'}}>1 Week</Button> &nbsp;
                        <Button size={'small'} onClick={() => this.historyPeriodHandler(30)} style={{marginLeft:'6px'}}>1 Month</Button> &nbsp; 
                        <Button size={'small'} onClick={() => this.historyPeriodHandler(90)} style={{marginLeft:'6px'}}>3 Months</Button>
                    </FormItem>
                
                    <FormItem label="From" style={{marginLeft:'6px'}}>
                        <DatePicker
                            disabledDate={this.disabledStartDate}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={startValue}
                            placeholder="Start"
                            onChange={this.onStartChange}
                            onOpenChange={this.handleStartOpenChange}
                            size={'small'} 
                            style={{backgroundColor:'#262D32', color:'white'}}
                        />
                    </FormItem>
                    <FormItem label="To">
                        <DatePicker
                            disabledDate={this.disabledEndDate}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={endValue}
                            placeholder="End"
                            onChange={this.onEndChange}
                            open={endOpen}
                            onOpenChange={this.handleEndOpenChange}
                            size={'small'} 
                            style={{backgroundColor:'#262D32 !important', color:'white'}}
                        />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" ghost size={'small'}>Search</Button>
                    </FormItem>
                </Form>
            </Row>
            
        );

        return (
            <div className="card-container">
                <Tabs type="card" style={{backgroundColor:'#262D32', color:'white'}}>
                    <TabPane tab='Open Orders' key="1">
                        <FormTable tableHeaders={openOrderTable.headers} />
                    </TabPane>
                    <TabPane tab='Order History' key="2">
                        { historyPeriodForm }
                        <FormTable tableHeaders={orderHistoryTable.headers} />
                    </TabPane>
                    <TabPane tab='Trade History' key="3">
                        { historyPeriodForm }
                        <FormTable tableHeaders={tradeHistoryTable.headers} />
                    </TabPane>
                    <TabPane tab='Funds' key="4">
                        <FormTable tableHeaders={fundsTable.headers} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default TradeReport;