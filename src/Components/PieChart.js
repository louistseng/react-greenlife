import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

export default class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [44, 55, 13, 43, 22, 10],
            options: {
                colors:['#68a9f3', '#ff8e86', '#d6a0fa', '#5fe6bd', '#8bcc78', '#ffa959'],
                labels: ['環境教育', '淨灘', '綠色旅遊', '綠色餐廳', '環保旅宿', '其他'],
                chart: {
                    type: 'pie',
                },
                title: {
                    text: "109年參加活動類型",
                    margin: 20,
                    align: 'center',
                    style: {
                        fontSize:  '14px',
                        fontWeight:  'bold',
                        color:  '#666666'
                      },
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom',
                            horizontalAlign: 'center', 
                        }
                    }
                }]
            },


        };
    }

    render() {
        return (


            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width="100%" height="264px"/>
            </div>
        )
    }
}