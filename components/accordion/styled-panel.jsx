import styled from 'styled-components';
import { resetStyles } from '../utils';

export const Panel = styled.div.attrs({
	role: 'region',
	'aria-labelledby': ({ headerId }) => `accordion-header-${headerId}`,
	id: ({ panelId }) => `accordion-panel-${panelId}`,
})`
	${resetStyles};

	grid-area: panel;

	padding: 8px 24px 32px;
`;

export const PanelContainer = styled.div`
	min-width: 0;
`;
