import React from 'react';
import isEqual from 'lodash/isEqual';

import LineChart from 'app/components/charts/lineChart';
import AreaChart from 'app/components/charts/areaChart';
import {Series} from 'app/types/echarts';

import {YAxis} from '.';

type Props = {
  reloading: boolean;
  utc: boolean;
  releaseSeries: Series[];
  timeseriesData: Series[];
  // zoomRenderProps: any;
  yAxis: YAxis;
};

class ReleaseChart extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.reloading || !nextProps.timeseriesData) {
      return false;
    }

    if (
      isEqual(this.props.timeseriesData, nextProps.timeseriesData) &&
      isEqual(this.props.releaseSeries, nextProps.releaseSeries)
    ) {
      return false;
    }

    return true;
  }

  render() {
    const {utc, releaseSeries, timeseriesData, yAxis} = this.props;
    const crashFreeChart = yAxis === 'crashFree';
    const Chart = crashFreeChart ? AreaChart : LineChart;

    const legend = {
      right: 16,
      top: 16,
      selectedMode: false,
      icon: 'circle',
      itemHeight: 8,
      itemWidth: 8,
      itemGap: 12,
      align: 'left',
      textStyle: {
        verticalAlign: 'top',
        fontSize: 11,
        fontFamily: 'Rubik',
      },
      data: timeseriesData.map(d => d.seriesName),
    };

    return (
      <Chart
        legend={legend}
        utc={utc}
        // {zoomRenderProps}
        series={[...timeseriesData, ...releaseSeries]}
        isGroupedByDate
        seriesOptions={{
          showSymbol: false,
        }}
        grid={{
          left: '24px',
          right: '24px',
          top: '32px',
          bottom: '12px',
        }}
        yAxis={
          crashFreeChart
            ? {
                min: 0,
                max: 100,
                interval: 25,
                axisLabel: {
                  formatter: '{value}%',
                },
              }
            : undefined
        }
        tooltip={crashFreeChart ? {appendToValue: '%'} : undefined}
      />
    );
  }
}

export default ReleaseChart;
