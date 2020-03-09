import React from 'react';
import { observer } from 'mobx-react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const TodoStatistic = observer(({ todoList }) => {
    const data = {
        todo: {
            countResult: {},
            seriesData: []
        },
        completed: {
            countResult: {},
            seriesData: []
        }
    };
    const xCategories = [];
    todoList.slice().sort((item1, item2)=> {
        return item1.dueDate.getTime() - item2.dueDate.getTime();
    }).forEach((item, index) => {
        const newDate = Highcharts.dateFormat('%m/%d/%Y', item.dueDate.getTime());
        if (index === 0) {
            xCategories.push(newDate);
        } else if (xCategories[index-1] !== newDate) {
            xCategories.push(newDate);
        }

        const countResult = data[item.isCompleted ? 'completed' : 'todo'].countResult;
        if (Reflect.has(countResult, newDate)) {
            Reflect.get(countResult, newDate).y += 1;
        } else {
            Reflect.set(countResult, newDate, { y: 1 });
        }
    });

    xCategories.forEach((date)=> {
        ['todo', 'completed'].forEach((key)=> {
            if (Reflect.has(data[key].countResult, date)) {
                data[key].seriesData.push(Reflect.get(data[key].countResult, date));
            } else {
                data[key].seriesData.push({ y: 0 });
            }
        })
    });

    const options = {
        title: {
            text: 'Statistic of TODO Items'
        },
        yAxis: {
            title: {
                text: 'Count',
                style: {
                    fontWeight: 'bold'
                }
            },
            tickInterval: 1
        },
        xAxis: {
            title: {
                text: 'Date',
                style: {
                    fontWeight: 'bold'
                }
            },
            categories: xCategories
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series: [{
            name: 'TODO items',
            data: data.todo.seriesData
        }, {
            name: 'Completed Items',
            data: data.completed.seriesData
        }]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
});

export default TodoStatistic;