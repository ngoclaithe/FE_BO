
export const initialChartData = {
  series: [
    {
      name: 'Giá',
      data: [],
    },
  ],
  options: {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: true,
      },
      toolbar: {
        tools: {
          download: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#ffffff',
        },
      },
      range: undefined,
    },
    yaxis: {
      labels: {
        style: {
          colors: '#ffffff',
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
    },
    grid: {
      borderColor: '#363636',
    },
    annotations: {
      xaxis: [],
    },
  },
};