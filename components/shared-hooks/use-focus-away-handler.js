import { useCallback, useRef, useEffect } from 'react';

export function useFocusAwayHandler(onFocusAwayCallback) {
	const targetRef = useRef();

	const onBlur = useCallback(
		event => {
			if (targetRef.current) {
				const relatedTarget =
					event.relatedTarget || event.explicitOriginalTarget || document.activeElement;
				console.log('rt', !relatedTarget, 'cont', !targetRef.current.contains(relatedTarget));
				if (!relatedTarget || !targetRef.current.contains(relatedTarget)) {
					onFocusAwayCallback();
				}
			}
		},
		[onFocusAwayCallback],
	);

	useEffect(
		() => {
			if (targetRef.current) {
				targetRef.current.addEventListener('focusout', onBlur);

				return () => {
					targetRef.current.removeEventListener('focusout', onBlur);
				};
			}
		},
		[onBlur],
	);

	return targetRef;
}
