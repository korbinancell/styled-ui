import styled from 'styled-components';
import { colors } from '../../shared-styles';
import * as CalendarStyled from '../calendar-date/styled';

export const CalendarWeekDay = styled.button`
	${CalendarStyled.calendarWeekDayCss};
	width: 35px;
`;
export const CalendarWeekDaySelected = CalendarStyled.CalendarWeekDaySelected.extend`width: 35px;`;
export const CalendarWeekDayInRange = CalendarStyled.CalendarWeekDayInRange.extend`width: 35px;`;

export const Title = styled.div`
	background: ${colors.white};
	color: ${colors.gray66};
	line-height: 32px;
	font-weight: bold;
	text-align: center;
	font-size: 14px;
	border-bottom: 1px solid ${colors.gray14};
`;

export const DaysContainer = styled.div`
	display: flex;
	flex-direction: row;
`;
