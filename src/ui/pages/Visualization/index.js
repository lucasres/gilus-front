import { Line } from "@ant-design/plots";
import { Typography, Layout, Skeleton, message } from "antd";
import useTitle from "../../../hooks/useTitle";
import { useParams } from "react-router-dom";
import ExecutionService from "../../../services/Execution";
import { useEffect, useState } from "react";

const { Title } = Typography
const { Content } = Layout

const service = new ExecutionService()

const Visualization = () => {
    const { name } = useParams()
    useTitle(`Visualização - ${name}`)
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    const config = {
        xField: 'pingAt',
        yField: 'value',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
            marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },
    };

    useEffect(() => {
        service.getPingsByCron(name)
            .then((data) => setData(data))
            .catch(() => message.error(`Erro ao recuperar as execuções da cron ${name}`))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
            </>
        )
    }

    return (
        <>
            <Title level={4}>Visualização</Title>
            <Content>
                <Line
                    data={data}
                    {...config}
                />
            </Content>
        </>
    )
}

export default Visualization
