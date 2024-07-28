import { createContext, useState } from "react";

export const BreadcrumbContext = createContext({
    breadcrumbs: [],
    setBreadcrumbs: () => {},
})

export const BreadcrumbProvider = (props) => {
    const [breadcrumbs, setBreadcrumbs] = useState([{ title: "Dashboard" }])

    return (
        <BreadcrumbContext.Provider
            value={{
                breadcrumbs,
                setBreadcrumbs
            }}
        >
            {props.children}
        </BreadcrumbContext.Provider>
    )
}