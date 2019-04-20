import React from 'react';

import './FormTable.css';

const formTable = ( props ) => {

    const headers = [];
    for (let key in props.tableHeaders) {
        headers.push({
            id: key,
            title: props.tableHeaders[key]
        });
    }

    const data = [];
    for (let key in props.tableData) {
        data.push({
            id: key,
            value: props.tableData[key]
        });
    }

    return (
        <div className="table-responsive"  style={{marginLeft: '1px'}}>
            <table className="table table-bordered" style={{width:'60%'}}>
                <thead>
                    <tr>{ headers.map(headerItem => ( <th key={headerItem.id} style={{paddingLeft: '15px'}}> {headerItem.title} </th>))}</tr>
                </thead>
                <tbody>
                    <tr>{ data.map(dataItem => ( <td key={dataItem.id}> {dataItem.title} </td>))}</tr>
                </tbody>
            </table>
        </div>
    );
}

export default formTable;