import React from 'react';
import PropTypes from 'prop-types';
import 'chartjs-plugin-datalabels';
import { Chart, HorizontalBar } from 'react-chartjs-2';

const StatisticsChart = props => {
  const { genres } = props;

  const data = {
    labels: genres.map(genre => genre.name),
    datasets: [
      {
        label: `Watched films statistics`,
        backgroundColor: '#ebdc49',
        borderColor: '#d9c502',
        borderWidth: 1,
        hoverBackgroundColor: '#f7e428',
        hoverBorderColor: '#ffe800',
        data: genres.map(genre => genre.moviesNumber),
      },
    ],
    options: {
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
      plugins: {
        datalabels: {
          align: `start`,
          anchor: `start`,
          offset: 25,
          font: {
            size: 18,
          },
          color: `#ffffff`,
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              padding: 60,
              fontStyle: `bold`,
              fontColor: `#ffffff`,
              fontSize: 22,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
      },
    },
  };

  return (
    <div>
      <HorizontalBar data={data} options={data.options} />
    </div>
  );
};

StatisticsChart.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      moviesNumber: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default StatisticsChart;
