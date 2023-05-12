import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';

interface IUseResponsive {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

export default function useResponsive(): IUseResponsive {
    // screen resolutions
    const [state, setState] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    });

    useEffect(() => {
        // update the state on the initial load
        onResizeHandler();

        // assign the event
        Setup();

        return () => {
            // remove the event
            Cleanup();
        };
    }, []);

    // update the state on window resize
    const onResizeHandler = (): void => {
        if (typeof window !== 'undefined') {
            const isMobile = window.innerWidth <= 768;
            const isTablet = window.innerWidth >= 768 && window.innerWidth <= 990;
            const isDesktop = window.innerWidth > 990;

            setState({ isMobile, isTablet, isDesktop });
        }
    };

    // debounce the resize call
    const debouncedCall = useDebounce(onResizeHandler, 500);

    // add event listener
    const Setup = (): void => {
        window?.addEventListener('resize', debouncedCall, false);
    };

    // remove the listener
    const Cleanup = (): void => {
        window?.removeEventListener('resize', debouncedCall, false);
    };

    return state;
}
