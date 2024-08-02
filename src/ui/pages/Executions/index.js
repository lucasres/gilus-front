import { useContext, useEffect, useState } from "react"
import { BreadcrumbContext } from "../../context/Breadcrumb"
import useTitle from "../../../hooks/useTitle"
import { Button, Table, Typography, Layout, message } from "antd"
import { EyeOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import ExecutionService from "../../../services/Execution";

const { Title } = Typography
const { Content } = Layout

const service = new ExecutionService()

const columns = [
    { 
        title: "Nome da cron",
        dataIndex: "name",
        width: "65%",
    },
    { 
        title: "Criado em",
        dataIndex: "createdAt",
        width: "20%",
    },
    {
        title: "Ações",
        dataIndex: "name",
        width: "15%",
        render: (name) => (
            <Link to={`/executions/${name}`}>
                <Button type="link"><EyeOutlined />Visualizar execuções</Button>
            </Link>
        )
    },
]

const Executions = () => {
    useTitle("Execuções")
    const { setBreadcrumbs, breadcrumbs } = useContext(BreadcrumbContext)
    const [loading, setLoading] = useState(true)
    const [dataSource, setDataSource] = useState([])
    
    useEffect(() => {
        setBreadcrumbs([{ title: "Dashboard" }, { title: "Execuções" }])
        setLoading(true)

        service.getCrons()
            .then((data) => setDataSource(data))
            .catch(() => message.error("Erro ao realizar a comunicação com a API"))
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <Title level={4}>Listagem de crons</Title>
            <Content
                style={{margin: "1rem"}}
            >
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    loading={loading}
                >
                </Table>
            </Content>
        </>
    )
}

export default Executions
