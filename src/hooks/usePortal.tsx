import { useEffect, useState } from "react";
import {  uuid } from "../utils/helper";
import { usePortalProps } from "../utils/types";

// Define the possible positions
const positions = {
    "top-right": { top: "10px", right: "10px", flexDirection: "column" },
    "top-left": { top: "10px", left: "10px", flexDirection: "column" },
    "bottom-right": { bottom: "12px", right: "10px", flexDirection: "column-reverse" },
    "bottom-left": { bottom: "12px", left: "10px", flexDirection: "column-reverse" },
    "top-center": { top: "10px", left: "50%", transform: "translateX(-50%)", flexDirection: "column" },
    "bottom-center": { bottom: "12px", left: "50%", transform: "translateX(-50%)", flexDirection: "column-reverse" },
    // Add more positions as needed...
};

// Define the possible position values
const positionValues = (name: keyof typeof positions) => {
    return positions[name] || {};
};

export const usePortal = ({ position }: usePortalProps) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [portalId] = useState(`toast-portal-${uuid()}`);

    useEffect(() => {
        const div = document.createElement("div");
        div.id = portalId;

        // Get the position values based on the position key
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const positionStyles = positionValues(position!);

        // Apply the position styles dynamically
        Object.keys(positionStyles).forEach((key: string) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (div.style as any)[key] = (positionStyles as any)[key];
        });

        div.style.position = "fixed";
        div.style.width = "300px";
        div.style.minHeight = "auto";
        div.style.overflow = "hidden";
        div.style.display = "flex";
        div.style.gap = "2px";

        document.getElementsByTagName("body")[0].prepend(div);
        setLoaded(true);

        return () => {
            document.getElementsByTagName("body")[0].removeChild(div);
        };
    }, [portalId, position]);

    return { loaded, portalId };
};

//?Optimizations
//document.createElement() is executed every render.
// Object.keys(positionStyles).forEach() is inefficient.

