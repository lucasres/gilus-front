import { Line } from "@ant-design/plots";
import { Typography, Layout, Skeleton, message, Row, Col, Select } from "antd";
import useTitle from "../../../hooks/useTitle";
import { useParams } from "react-router-dom";
import ExecutionService from "../../../services/Execution";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import intervals from "./intervals";

dayjs.extend(isBetween)

const { Title } = Typography
const { Content } = Layout

const service = new ExecutionService()

const DATE_FORMAT = "YYYY-MM-DD HH:mm:00"

const Visualization = () => {
    const { name } = useParams()
    useTitle(`Visualização - ${name}`)
    const [data, setData] = useState([])
    const [graphData, setGraphData] = useState([])
    const [exibitionType, setExibitionType] = useState("10m")
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
        yAxis: {
            min: 0,
            max: 1,
            tickInterval: 0.2,
        },
    };

    useEffect(() => {
        service.getPingsByCron(name)
            .then((data) => setData(data))
            .catch(() => message.error(`Erro ao recuperar as execuções da cron ${name}`))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        let newState = []
        const now = dayjs()

        if (exibitionType === "last") {
            newState = data
        } else {
            const { beetweenFactor, minutes } = intervals[exibitionType]
            

            for (let i = 0; i < 10; i++) {
                const pingAt = now.subtract(minutes[i], 'minute').format(DATE_FORMAT)
                let pingAtStr = pingAt
                if (beetweenFactor !== 0) {
                    pingAtStr = `${dayjs(pingAt).subtract(beetweenFactor, "minute").format(DATE_FORMAT)}~${pingAt}`
                }

                const amountPings = data.filter((d) => {
                    const currentTime = dayjs(d.pingAt) 
                    return beetweenFactor === 0 ?
                        d.pingAt === pingAt
                        : currentTime.isBetween(
                            dayjs(pingAt).subtract(beetweenFactor, 'minute'),
                            dayjs(pingAt)
                        )
                })

                newState.push({ pingAt: pingAtStr, value: amountPings.reduce((a, b) => a + b.value, 0) })
            }
        }

        setGraphData(newState)
    }, [data, exibitionType])

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
            <Row justify="space-between" style={{marginBottom: 14}}>
                <Col>
                    <Title level={4}>Visualização: {name}</Title>
                </Col>
                <Col>
                    <Select
                        options={[
                            {label: "Últimos 10 minutos", value: "10m",},
                            {label: "Última hora", value: "1h",},
                            {label: "Últimas 3 horas", value: "3h"},
                            {label: "Últimas 6 horas", value: "6h"},
                            {label: "Últimas execuções", value: "last"},
                        ]}
                        style={{width: "150px"}}
                        value={exibitionType}
                        onChange={(v) => setExibitionType(v)}
                    />
                </Col>
            </Row>
            <Content>
                <Line
                    data={graphData}
                    {...config}
                />
            </Content>
        </>
    )
}

export default Visualization
