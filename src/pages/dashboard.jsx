import React from 'react'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { toyService } from '../services/toy.service'

function _Dashboard({ toys }) {
  return (
    <section className="dashboard_aontainer">
      <div className="hero">
        <div className="main-layout">
          <h2>DASHBOARD</h2>
        </div>
      </div>
      <div className="toys-by-gender">
        {!toys && <div className="lds-hourglass"></div>}
        {toys && (
          <div className="chart">
            <Chart
              type="pie"
              data={{
                labels: ['Boys', 'Girls', 'Babies'],
                datasets: [
                  {
                    label: 'Chart',
                    data: toyService.getToysCountByGender(toys),
                    backgroundColor: ['#e8eaed', '#f28b82', '#ccff90'],
                  },
                ],
              }}
            />
          </div>
        )}
      </div>
      <div className="toys-prices-by-label">
        {!toys && <div className="lds-hourglass"></div>}
        {toys && (
          <div className="chart">
            <Chart
              type="bar"
              data={{
                labels: toyService.getLabelsNames(),
                datasets: [
                  {
                    label: 'Chart',
                    data: toyService.getLabelsAvgPrice(toys),
                    backgroundColor: ['#e8eaed', '#f28b82', '#ccff90'],
                  },
                ],
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}

function mapStateToProps(storeState) {
  return {
    toys: storeState.toyModule.toys,
  }
}

export const Dashboard = connect(mapStateToProps)(_Dashboard)
