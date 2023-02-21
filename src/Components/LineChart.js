import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

export default class LineChart extends Component {
    constructor(props) {
        super(props);

        // console.log(this.props.greenLifeResult)

        this.state = {

            series: [
                this.props.greenLifeResult.activityRes,
                this.props.greenLifeResult.myGreenRes,
                this.props.greenLifeResult.blogRes
            ],
            options: {
                chart: {
                    foreColor: '#929090',
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false,
                    }
                },

                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: [3, 3, 3],
                    curve: 'straight',
                    dashArray: [0, 5, 8],
                    colors: ['#f2645a', '#94dd7d', '#61a1f0']
                },
                title: {
                    text: '',
                    align: 'left'
                },
                legend: {
                    tooltipHoverFormatter: function (val, opts) {
                        return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
                    },
                    horizontalAlign: 'start',
                    position: 'top',
                    fontSize: '16px',
                    markers: {
                        fillColors: ['#f2645a', '#94dd7d', '#61a1f0'],
                    }
                },
                markers: {
                    size: 0,
                    hover: {
                        sizeOffset: 6
                    }
                },
                xaxis: this.props.greenLifeResult.activityRes,
                tooltip: {
                    y: [
                        {
                            formatter: function (val) {
                                return val?.toFixed(0)
                            }
                        },
                        {
                            formatter: function (val) {
                                return val?.toFixed(0)
                            }
                        },
                        {
                            formatter: function (val) {
                                return val?.toFixed(0);
                            }
                        }
                    ]
                },
                grid: {
                    borderColor: '#f1f1f1',
                }
            }
        };
    }


    render() {
        return (
            this.props.greenLifeResult &&
            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />

        )
    }
}