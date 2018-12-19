import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

const defDayList = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export class DayPicker extends Component {
	static propTypes = {
		setSelectedDate: PropTypes.func.isRequired,
		selectedDateRange: PropTypes.shape({
			start: PropTypes.string,
			end: PropTypes.string,
		}).isRequired,
		title: PropTypes.string,
		dayListOverride: PropTypes.arrayOf(PropTypes.string),
	};

	shouldComponentUpdate(prevProps) {
		return (
			prevProps.selectedDateRange.start !== this.props.selectedDateRange.start ||
			prevProps.selectedDateRange.end !== this.props.selectedDateRange.end
		);
	}

	isInDateRange = dayIndex => {
		const {
			selectedDateRange: { start, end },
			dayListOverride,
		} = this.props;
		const dayList = dayListOverride || defDayList;

		return dayIndex > dayList.indexOf(start) && dayIndex < dayList.indexOf(end);
	};

	handleClick = day => () => {
		const {
			selectedDateRange: { start, end },
			setSelectedDate,
			dayListOverride,
		} = this.props;
		const dayList = dayListOverride || defDayList;

		if ((!start && !end) || start !== end) {
			setSelectedDate({ start: day, end: day });
		} else if (start === end) {
			const dateRange =
				dayList.indexOf(start) < dayList.indexOf(day) ? { start, end: day } : { start: day, end };
			setSelectedDate(dateRange);
		}
	};

	render() {
		const {
			selectedDateRange: { start, end },
			title,
			dayListOverride,
		} = this.props;
		const dayList = dayListOverride || defDayList;
		const startIndex = dayList.indexOf(start);
		const endIndex = dayList.indexOf(end);

		return (
			<Fragment>
				<Styled.Title>{title || 'Select Days'}</Styled.Title>
				<Styled.DaysContainer>
					{dayList.map(day => {
						const dayIndex = dayList.indexOf(day);
						const inDateRange = this.isInDateRange(dayIndex);
						if (inDateRange) {
							return (
								<Styled.CalendarWeekDayInRange
									key={`${day}-inRange`}
									onClick={this.handleClick(day)}
								>
									{day}
								</Styled.CalendarWeekDayInRange>
							);
						} else if (dayIndex === startIndex || dayIndex === endIndex) {
							return (
								<Styled.CalendarWeekDaySelected
									key={`${day}-selected`}
									onClick={this.handleClick(day)}
								>
									{day}
								</Styled.CalendarWeekDaySelected>
							);
						}

						return (
							<Styled.CalendarWeekDay key={`${day}-!inRange`} onClick={this.handleClick(day)}>
								{day}
							</Styled.CalendarWeekDay>
						);
					})}
				</Styled.DaysContainer>
			</Fragment>
		);
	}
}
