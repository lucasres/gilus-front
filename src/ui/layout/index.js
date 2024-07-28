import { useContext } from "react"
import { BreadcrumbContext } from "../context/Breadcrumb"
import Logo from "../../assets/logo.png"
import { Breadcrumb, Flex, Layout, Menu } from "antd"
import { DashboardOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Sider } = Layout

const LayoutApp = (props) => {
    const { breadcrumbs } = useContext(BreadcrumbContext)

    return (
        <Layout
            style={{minHeight: "100vh"}}
        >
            <Sider trigger={null} style={{ background: "#16083a" }}>
                <div style={{display: "flex", justifyContent: "center", margin: "1rem"}}>
                    <img src={Logo} height={40} alt="logo do gilus" />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ background: "#16083a" }}
                    items={[
                        {
                            key: '1',
                            icon: <DashboardOutlined />,
                            label: <Link to="/">Dashboard</Link>,
                        },
                        {
                            key: '2',
                            icon: <PlayCircleOutlined />,
                            label: <Link to="/executions">Execuções</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout
                style={{ padding: '24px 16px',  backgroundColor: "#ebe7e4"}}
            >
                <Breadcrumb
                    style={{marginBottom: "16px"}}
                    items={breadcrumbs}
                >
                </Breadcrumb>
                {props.children}
            </Layout>
        </Layout>
    )
}

export default LayoutApp