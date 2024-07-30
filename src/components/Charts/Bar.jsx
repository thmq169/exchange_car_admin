import React from 'react'
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  Highlight,
  BarSeries,
} from '@syncfusion/ej2-react-charts'

const Bar = ({ data, titleChart, nameColumn, titleHeading }) => {
  return (
    <ChartComponent
      id='charts-bar'
      style={{ textAlign: 'center' }}
      legendSettings={{ enableHighlight: true }}
      primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }}
      primaryYAxis={{
        labelFormat: '{value}%',
        title: titleChart,
        edgeLabelPlacement: 'Shift',
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
      }}
      chartArea={{ border: { width: 0 } }}
      width='100%'
      title={titleHeading}
      tooltip={{ enable: true }}
    >
      <Inject services={[BarSeries, DataLabel, Category, Legend, Tooltip, Highlight]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          xName='x'
          yName='y'
          type='Bar'
          columnSpacing={0.1}
          name={nameColumn}
          width={2}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default Bar
