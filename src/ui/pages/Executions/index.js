import { useContext, useEffect } from "react"
import { BreadcrumbContext } from "../../context/Breadcrumb"
import useTitle from "../../../hooks/useTitle"
import { Button, Table, Typography, Layout } from "antd"
import { EyeOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Title } = Typography
const { Content } = Layout

const Executions = () => {
    useTitle("Execuções")
    const { setBreadcrumbs, breadcrumbs } = useContext(BreadcrumbContext)

    useEffect(() => {
        setBreadcrumbs([{ title: "Dashboard" }, { title: "Execuções" }])
    }, [])

    const dataSource = [
        {
            id: "Cron #1",
        },
        {
            id: "teste #2",
        }
    ]

    const columns = [
        { 
            title: "Nome da cron",
            dataIndex: "id",
            width: "85%",
        },
        {
            title: "Ações",
            dataIndex: "id",
            width: "15%",
            render: (id) => (
                <Link to={`/executions/${id}`}>
                    <Button type="link"><EyeOutlined /> Visualizar execuções</Button>
                </Link>
            )
        },
    ]

    return (
        <>
            <Title level={4}>Listagem de crons</Title>
            <Content
                style={{margin: "1rem"}}
            >
                <Table
                    dataSource={dataSource}
                    columns={columns}
                >
                </Table>
            </Content>
        </>
    )
}

export default Executions
