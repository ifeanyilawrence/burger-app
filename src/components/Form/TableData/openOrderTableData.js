export default {
    columns: () => {
        return(
            [{
                title: 'Date',
                dataIndex: 'date',
                },{
                    title: 'Pair',
                    dataIndex: 'pair',
                },{
                    title: 'Type',
                    dataIndex: 'type',
                },{
                title: 'Side',
                dataIndex: 'side',
                },{
                    title: 'Price',
                    dataIndex: 'price',
                },{
                    title: 'Amount',
                    dataIndex: 'amount',
                },{
                    title: 'Filled%',
                    dataIndex: 'filled',
                },{
                    title: 'Total',
                    dataIndex: 'total',
                },{
                title: 'Trigger Conditions',
                dataIndex: 'trigger',
              }]
        );
},
data: () => {
    return (
            [{
            key: '1',
            date: '01-01-2018',
            pair: 'BTCETH',
            type: '',
            side: 'Buy',
            price: 0.03567,
            amount: 62,
            filled: '',
            total: 2.33,
            trigger: ''
          }]
    );
},
headers: ['Date', 'Pair', 'Type', 'Side', 'Price', 'Amount', 'Filled%', 'Total', 'Trigger Conditions'],
}