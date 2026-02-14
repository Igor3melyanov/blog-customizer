import { RefObject, useEffect } from 'react';

type UseCloseSidebarProps = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: RefObject<HTMLElement>;
};

export const UseCloseSidebar = ({
	isOpen,
	onClose,
	rootRef,
}: UseCloseSidebarProps) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onClose();
			}
		};

		window.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose, rootRef]);
};
