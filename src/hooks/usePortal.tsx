/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import { seprateWords, uuid } from "../utils/helper";
// import { usePortalProps } from "../utils/types";

// export const usePortal = ({position}:usePortalProps)=>{
//     const [loaded,setLoaded] = useState<boolean>(false);
//     const [portalId] = useState(`toast-portal-${uuid()}`);

//     // Splitting position into two words to apply CSS positioning properties.
//     const [x,y] = seprateWords(position!) as string[];

//     useEffect(()=>{
//         const div = document.createElement("div");
//         div.id = portalId;
//         div.style = `
//         position: fixed; 
//         ${x}: 10px;
//         ${y}: 10px;
//         width:250px; 
//         min-height:100%; 
//         overflow-hidden; 
//         display:flex; 
//         flex-direction:column; 
//         gap:2px`;

//         document.getElementsByTagName("body")[0].prepend(div);
//         setLoaded(true);

//         return () => {
//             document.getElementsByTagName("body")[0].removeChild(div);
//         }
//     },[portalId]);
//     return {loaded,portalId};
// };


import { useEffect, useState } from "react";
import {  uuid } from "../utils/helper";
import { usePortalProps } from "../utils/types";

// Define the possible positions
const positions = {
    "top-right": { top: "10px", right: "10px", flexDirection: "column" },
    "top-left": { top: "10px", left: "10px", flexDirection: "column" },
    "bottom-right": { bottom: "10px", right: "10px", flexDirection: "column-reverse" },
    "bottom-left": { bottom: "10px", left: "10px", flexDirection: "column-reverse" }
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
        const positionStyles = positionValues(position!);

        // Apply the position styles dynamically
        Object.keys(positionStyles).forEach((key: string) => {
            (div.style as any)[key] = (positionStyles as any)[key];
        });

        div.style.position = "fixed";
        div.style.width = "250px";
        div.style.minHeight = "100%";
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
