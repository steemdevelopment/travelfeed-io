// http://recharts.org/en-US/examples/SimpleBarChart
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [];

export default class RecentEarningsChart extends PureComponent {
  render() {
    const months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    this.props.recent_payouts.forEach(d => {
      data.push({ name: months[d.month], earnings: d.earnings });
    });
    return (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="earnings" fill={this.props.color} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

RecentEarningsChart.propTypes = {
  recent_payouts: PropTypes.array,
  color: PropTypes.string
};
