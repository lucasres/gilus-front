import { Line } from "@ant-design/plots";
import { Typography, Layout } from "antd";
import useTitle from "../../../hooks/useTitle";
import { useParams } from "react-router-dom";

const { Title } = Typography
const { Content } = Layout

const Visualization = () => {
    const { name } = useParams()
    useTitle(`Visualização - ${name}`)

    const data = [
        { pingAt: '16:53 28/07/2024', value: 1 },
        { pingAt: '16:54 28/07/2024', value: 1 },
        { pingAt: '16:55 28/07/2024', value: 0 },
        { pingAt: '16:56 28/07/2024', value: 0 },
        { pingAt: '16:57 28/07/2024', value: 0 },
        { pingAt: '16:58 28/07/2024', value: 1 },
        { pingAt: '16:59 28/07/2024', value: 1 },
        { pingAt: '17:00 28/07/2024', value: 1 },
    ];
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
