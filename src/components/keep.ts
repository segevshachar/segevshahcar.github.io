import {
  lightningChart,
  AxisTickStrategies,
  LegendBoxBuilders,
  AutoCursorModes,
  AxisScrollStrategies,
  emptyLine,
} from '@arction/lcjs';

import TimelinesChart, { Group } from 'timelines-chart';

export function keep() {
  const dateOrigin = new Date(2008, 0, 1);
  const chart = lightningChart().ChartXY({
    container: 'chart1',
  });

  const myData = [
    {
      group: 'group1',
      data: [
        {
          label: 'label1',
          data: [
            {
              timeRange: [
                new Date('1995-11-17T03:24:00'),
                new Date('1995-12-17T03:24:00'),
              ],
              val: 'D',
            },
            {
              timeRange: [
                new Date('1997-11-17T03:24:00'),
                new Date('1997-12-17T03:24:00'),
              ],
              val: 'B',
            },
          ],
        },
        {
          label: 'label2',
          data: [
            {
              timeRange: [
                new Date('1995-01-17T03:24:00'),
                new Date('1995-02-17T03:24:00'),
              ],
              val: 'C',
            },
            {
              timeRange: [
                new Date('1997-01-17T03:24:00'),
                new Date('1997-02-17T03:24:00'),
              ],
              val: 'A',
            },
          ],
        },
      ],
    },
    {
      group: 'group2',
      data: [
        {
          label: 'label12',
          data: [
            {
              timeRange: [
                new Date('1995-03-17T03:24:00'),
                new Date('1995-12-17T03:24:00'),
              ],
              val: 'D',
            },
            {
              timeRange: [
                new Date('1997-04-17T03:24:00'),
                new Date('1997-12-17T03:24:00'),
              ],
              val: 'C',
            },
          ],
        },
        {
          label: 'label22',
          data: [
            {
              timeRange: [
                new Date('1995-01-17T03:24:00'),
                new Date('1995-05-17T03:24:00'),
              ],
              val: 'B',
            },
            {
              timeRange: [
                new Date('1997-01-17T03:24:00'),
                new Date('1997-06-17T03:24:00'),
              ],
              val: 'A',
            },
          ],
        },
      ],
    },
  ];

  const chart3 = document.getElementById('chart3');
  const myChart = TimelinesChart();
  myChart.data(myData as Group[])(chart3 as HTMLElement);
  myChart.zQualitative(true);
  myChart.width(1200);
  myChart.zoomX([
    new Date('1990-01-01T00:00:00'),
    new Date('2000-01-01T00:00:00'),
  ]);

  chart.getDefaultAxisX().setTickStrategy(
    // Use DateTime TickStrategy for this Axis
    AxisTickStrategies.DateTime,
    // Modify the DateOrigin of the TickStrategy
    (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin)
  );
  chart.setTitle('Customer Satisfaction');

  // Add a line series.
  const lineSeries = chart.addLineSeries().setName('Customer Satisfaction');
  const lineSeries2 = chart.addLineSeries().setName('Try');

  // Generate some points using for each month
  const dataFrequency = 30 * 24 * 60 * 60 * 1000;

  // Setup view nicely.
  chart
    .getDefaultAxisY()
    .setScrollStrategy(undefined)
    .setInterval({ start: 0, end: 100, stopAxisAfter: false })
    .setTitle('Satisfaction %');

  // Data for the plotting
  const satisfactionData = [
    { x: 0, y: 0 },
    { x: 1, y: 8 },
    { x: 2, y: 12 },
    { x: 3, y: 18 },
    { x: 4, y: 22 },
    { x: 5, y: 32 },
    { x: 6, y: 40 },
    { x: 7, y: 48 },
    { x: 8, y: 50 },
    { x: 9, y: 54 },
    { x: 10, y: 59 },
    { x: 11, y: 65 },
    { x: 12, y: 70 },
    { x: 13, y: 68 },
    { x: 14, y: 70 },
    { x: 15, y: 69 },
    { x: 16, y: 66 },
    { x: 17, y: 65.4 },
    { x: 18, y: 64 },
    { x: 19, y: 65 },
    { x: 20, y: 63.5 },
    { x: 21, y: 62 },
    { x: 22, y: 61.2 },
    { x: 23, y: 63 },
    { x: 24, y: 61 },
    { x: 25, y: 62 },
    { x: 26, y: 62 },
    { x: 27, y: 60 },
    { x: 28, y: 57.8 },
    { x: 29, y: 58 },
    { x: 30, y: 61 },
    { x: 31, y: 59 },
    { x: 32, y: 63 },
    { x: 33, y: 61 },
    { x: 34, y: 61.8 },
    { x: 35, y: 62 },
    { x: 36, y: 59.9 },
    { x: 37, y: 58 },
    { x: 38, y: 60 },
    { x: 39, y: 63 },
    { x: 40, y: 59.5 },
    { x: 41, y: 62.5 },
    { x: 42, y: 59.7 },
    { x: 43, y: 57 },
    { x: 44, y: 61 },
    { x: 45, y: 59 },
    { x: 46, y: 61 },
    { x: 47, y: 65 },
    { x: 48, y: 62 },
    { x: 49, y: 60 },
    { x: 50, y: 58 },
    { x: 51, y: 59 },
    { x: 52, y: 61 },
    { x: 53, y: 64 },
    { x: 54, y: 65.5 },
    { x: 55, y: 67 },
    { x: 56, y: 68 },
    { x: 57, y: 69 },
    { x: 58, y: 68 },
    { x: 59, y: 69.5 },
    { x: 60, y: 69.9 },
    { x: 61, y: 68.5 },
    { x: 62, y: 67 },
    { x: 63, y: 65 },
    { x: 64, y: 63 },
    { x: 65, y: 60 },
    { x: 66, y: 61.6 },
    { x: 67, y: 62 },
    { x: 68, y: 61 },
    { x: 69, y: 60 },
    { x: 70, y: 63.3 },
    { x: 71, y: 62.7 },
    { x: 72, y: 64.3 },
    { x: 73, y: 63 },
    { x: 74, y: 61.2 },
    { x: 75, y: 60 },
    { x: 76, y: 61 },
    { x: 77, y: 64 },
    { x: 78, y: 61.9 },
    { x: 79, y: 61 },
    { x: 80, y: 58 },
    { x: 81, y: 59 },
    { x: 82, y: 60.5 },
    { x: 83, y: 61 },
    { x: 84, y: 63 },
    { x: 85, y: 64.5 },
    { x: 86, y: 65 },
    { x: 87, y: 66.2 },
    { x: 88, y: 64.9 },
    { x: 89, y: 63 },
    { x: 90, y: 62 },
    { x: 91, y: 63 },
    { x: 92, y: 61.8 },
    { x: 93, y: 62 },
    { x: 94, y: 63 },
    { x: 95, y: 64.2 },
    { x: 96, y: 63 },
    { x: 97, y: 61 },
    { x: 98, y: 59.7 },
    { x: 99, y: 61 },
    { x: 100, y: 58 },
    { x: 101, y: 59 },
    { x: 102, y: 58 },
    { x: 103, y: 58 },
    { x: 104, y: 57.5 },
    { x: 105, y: 59.2 },
    { x: 106, y: 60 },
    { x: 107, y: 61.9 },
    { x: 108, y: 63 },
    { x: 109, y: 64.1 },
    { x: 110, y: 65.9 },
    { x: 111, y: 64 },
    { x: 112, y: 65 },
    { x: 113, y: 62 },
    { x: 114, y: 60 },
    { x: 115, y: 58 },
    { x: 116, y: 57 },
    { x: 117, y: 58.2 },
    { x: 118, y: 58.6 },
    { x: 119, y: 59.3 },
    { x: 120, y: 61 },
  ];

  // Adding points to the series
  lineSeries.add(
    satisfactionData.map((point) => ({
      x: point.x * dataFrequency,
      y: point.y,
    }))
  );
  lineSeries2.add(
    satisfactionData.map((point) => ({
      x: point.x * dataFrequency,
      y: point.y / 2,
    }))
  );

  // Show the customized result table for each point
  lineSeries.setCursorResultTableFormatter(
    (builder, series, xValue, yValue) => {
      return builder
        .addRow('Customer Satisfaction')
        .addRow(series.axisX.formatValue(xValue))
        .addRow(yValue.toFixed(2) + '%');
    }
  );

  const legendBox = chart.addLegendBox(LegendBoxBuilders.VerticalLegendBox);
  // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
  legendBox.setTitle('Department');

  legendBox.add(lineSeries);
  legendBox.add(lineSeries2);

  const lc = lightningChart();

  // Define an interface for creating vertical bars.
  let barChart;
  {
    barChart = (options: any) => {
      const figureThickness = 10;
      const figureGap = figureThickness * 0.25;
      const groupGap = figureGap * 3.0;
      const groups: any[] = [];
      const categories: any[] = [];

      // Create a XY-Chart and add a RectSeries to it for rendering rectangles.
      const chart = lc
        .ChartXY(options)
        .setTitle('Grouped Bars (Employee Count)')
        .setAutoCursorMode(AutoCursorModes.onHover)
        // Disable mouse interactions (e.g. zooming and panning) of plotting area
        .setMouseInteractions(false)
        // Temporary fix for library-side bug. Remove after fixed.
        .setPadding({ bottom: 30 });

      // X-axis of the series
      const axisX = chart
        .getDefaultAxisX()
        .setMouseInteractions(false)
        .setScrollStrategy(undefined)
        // Disable default ticks.
        .setTickStrategy(AxisTickStrategies.Empty);

      // Y-axis of the series
      const axisY = chart
        .getDefaultAxisY()
        .setMouseInteractions(false)
        .setTitle('Number of Employees')
        .setInterval({ start: 0, end: 70, stopAxisAfter: false })
        .setScrollStrategy(AxisScrollStrategies.fitting);

      // cursor
      //#region
      // Modify AutoCursor.
      chart.setAutoCursor((cursor) =>
        cursor
          .setPointMarkerVisible(false)
          .setTickMarkerXVisible(false)
          .setTickMarkerYVisible(false)
          .setGridStrokeXStyle(emptyLine)
          .setGridStrokeYStyle(emptyLine)
      );
      // Define function that creates a Rectangle series (for each category), that adds cursor functionality to it
      const createSeriesForCategory = (category: any) => {
        const series = chart
          .addRectangleSeries()
          .setDefaultStyle((rect) => rect.setStrokeStyle(emptyLine));
        // Change how marker displays its information.
        series.setCursorResultTableFormatter((builder, series, figure) => {
          // Find cached entry for the figure.
          const entry = {
            name: category.name,
            value: category.data[category.figures.indexOf(figure)],
          };
          // Parse result table content from values of 'entry'.
          return builder
            .addRow('Department:', entry.name)
            .addRow('# of employees:', String(entry.value));
        });
        return series;
      };
      //#endregion
      // LegendBox
      //#region
      const legendBox = chart
        .addLegendBox(LegendBoxBuilders.VerticalLegendBox)
        // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
        .setTitle('Department');

      //#endregion
      // Function redraws bars chart based on values of 'groups' and 'categories'
      const redraw = () => {
        let x = 0;
        for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
          const group = groups[groupIndex];
          const xStart = x;
          for (const category of categories) {
            const value = category.data[groupIndex];
            if (value !== undefined) {
              // Position figure of respective value.
              const figure = category.figures[groupIndex];
              figure.setDimensions({
                x,
                y: 0,
                width: figureThickness,
                height: value,
              });
              // Figure gap
              x += figureThickness + figureGap;
            }
          }
          // Position CustomTick
          group.tick.setValue((xStart + x - figureGap) / 2);

          // Group gap
          x += groupGap;
        }
        axisX.setInterval({
          start: -(groupGap + figureGap),
          end: x,
          stopAxisAfter: false,
        });
      };
      const addGroups = (names: any) => {
        for (const name of names)
          groups.push({
            name,
            tick: axisX
              .addCustomTick()
              .setGridStrokeLength(0)
              .setTextFormatter((_) => name),
          });
      };
      const addCategory = (entry: any) => {
        // Each category has its own series.
        const series = createSeriesForCategory(entry).setName(entry.name);
        entry.figures = entry.data.map((value: any) =>
          series.add({ x: 0, y: 0, width: 0, height: 0 })
        );
        legendBox.add(series);
        categories.push(entry);
        redraw();
      };
      // Return public methods of a bar chart interface.
      return {
        addCategory,
        addGroups,
      };
    };
  }

  // Use bar chart interface to construct series
  const chart2 = barChart({
    container: 'chart2',
  });

  // Add groups
  chart2.addGroups(['Finland', 'Germany', 'UK']);

  // Add categories of bars
  const categories = ['Engineers', 'Sales', 'Marketing'];
  const data = [
    [48, 27, 24],
    [19, 40, 14],
    [33, 33, 62],
  ];
  data.forEach((data, i) =>
    chart2.addCategory({
      name: categories[i],
      data,
    })
  );
}
