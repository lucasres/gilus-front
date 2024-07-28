import { Layout, theme } from "antd"
import useTitle from "../../../hooks/useTitle";
import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "../../context/Breadcrumb";

const { Content } = Layout

const Dashboard = () => {
    useTitle("Dashboard")
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { setBreadcrumbs } = useContext(BreadcrumbContext)

    useEffect(() => {
        setBreadcrumbs([{ title: "Dashboard" }])
    }, [])

    return (
        <Content
            style={{
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG
            }}
        >
            
        </Content>
    )
}

export default Dashboard