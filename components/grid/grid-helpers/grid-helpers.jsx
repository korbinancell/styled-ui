import React, { useImperativeHandle, useState, useCallback, useRef } from 'react';

const treeGroupColumnComponent = 'treeGroupColumn';

export const dragDirections = {
	up: 'up',
	down: 'down',
};

export const dragEventTypes = {
	drag: 'rowDragMove',
	drop: 'rowDragEnd',
	leave: 'rowDragLeave',
};

export function useGridState() {
	const [gridApi, setGridApi] = useState(null);
	const [columnApi, setColumnApi] = useState(null);

	return { gridApi, setGridApi, columnApi, setColumnApi };
}

export function useGridHandles(gridApi, ref) {
	useImperativeHandle(
		ref,
		() => ({
			selectAllRows() {
				if (gridApi) {
					gridApi.selectAll();
				}
			},
			deselectAllRows() {
				if (gridApi) {
					gridApi.deselectAll();
				}
			},
			selectFilteredRows() {
				if (gridApi) {
					gridApi.selectAllFiltered();
				}
			},
			deselectFilteredRows() {
				if (gridApi) {
					gridApi.deselectAllFiltered();
				}
			},
		}),
		[gridApi],
	);
}

export function handleShowCheckbox(shouldShowCheckbox) {
	return params => {
		shouldShowCheckbox(params.node.group, params.node.data);
	};
}

export function handleIsDraggable(isDraggable) {
	return params => {
		isDraggable(params.node.group, params.node.data);
	};
}

export function handleIsEditable(shouldBeEditable) {
	return ({ node }) => {
		shouldBeEditable(node.group, node.data);
	};
}

export function getAggregationColumn({
	children,
	getShouldShowDropTarget,
	isDraggableRow,
	enableDragDrop,
}) {
	const heading = React.Children.toArray(children).find(
		child => child && child.type.isAggregationGroupColumn,
	);

	let groupComponent;
	let groupColumnSettings;
	let rowClickSelects;
	if (heading) {
		const {
			displayName,
			cellComponent,
			isSortable,
			defaultSort,
			isResizable,
			hideChildrenCount,
			showCheckbox,
			shouldShowCheckbox,
			fieldName,
			...groupProps
		} = heading.props;

		rowClickSelects = !showCheckbox && !shouldShowCheckbox;
		groupComponent = cellComponent ? { [treeGroupColumnComponent]: cellComponent } : {};
		groupColumnSettings = {
			rowDrag: isDraggableRow ? handleIsDraggable(isDraggableRow) : enableDragDrop,
			headerName: displayName,
			field: fieldName,
			sortable: isSortable,
			sort: defaultSort,
			resizable: isResizable,
			cellRendererParams: {
				suppressCount: hideChildrenCount,
				innerRenderer: cellComponent ? treeGroupColumnComponent : '',
				checkbox: shouldShowCheckbox ? handleShowCheckbox(shouldShowCheckbox) : showCheckbox,
			},
			cellClass: 'ag-faithlife-cell',
			cellClassRules: {
				'ag-faithlife-drop-target-row_below': getShouldShowDropTarget(dragDirections.down),
				'ag-faithlife-drop-target-row_above': getShouldShowDropTarget(dragDirections.up),
			},
			headerClass:
				enableDragDrop || isDraggableRow
					? 'ag-faithlife-tree-group-header-with-drag'
					: 'ag-faithlife-tree-group-header',
			...groupProps,
		};
	}

	return { heading, groupComponent, groupColumnSettings, rowClickSelects };
}

export function useGridDragDrop(isValidDropTarget, getNewPath) {
	const previousHoveredRowNode = useRef();
	const hoveredRowNode = useRef();
	const draggedNode = useRef();
	const dragDirection = useRef();

	const getShouldShowDropTarget = useCallback(
		onDirection => ({ rowIndex }) => {
			if (
				isValidDropTarget &&
				!isValidDropTarget(
					draggedNode.current.node.data,
					getNewPath(hoveredRowNode.current.node, dragDirection.current),
				)
			) {
				return false;
			}
			return (
				hoveredRowNode.current &&
				hoveredRowNode.current.rowIndex === rowIndex &&
				draggedNode.current.rowIndex !== hoveredRowNode.current.rowIndex &&
				dragDirection.current === onDirection
			);
		},
		[isValidDropTarget, getNewPath],
	);

	return {
		previousHoveredRowNode,
		hoveredRowNode,
		draggedNode,
		dragDirection,
		getShouldShowDropTarget,
	};
}

export function useCellEditor(ref, cellValue, isPopover = false) {
	const [showAsPopover] = useState(isPopover);

	useImperativeHandle(
		ref,
		() => ({
			getValue() {
				return cellValue;
			},
			isPopup() {
				return showAsPopover;
			},
		}),
		[cellValue, showAsPopover],
	);
}
