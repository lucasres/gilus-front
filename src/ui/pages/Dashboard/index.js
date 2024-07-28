import { Button, Divider, Input, Layout, Select, Skeleton, theme, Typography } from "antd"
import useTitle from "../../../hooks/useTitle";
import { useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "../../context/Breadcrumb";
import CloudAnimation from "../../../assets/lotties/cloud.json";
import Lottie from "react-lottie";

const { Content } = Layout
const { Title } = Typography

const Dashboard = () => {
    useTitle("Dashboard")
    const {
        token: { borderRadiusLG },
    } = theme.useToken();
    const { setBreadcrumbs } = useContext(BreadcrumbContext)
    const [cronName, setCronName] = useState(undefined)
    const [stack, setStack] = useState("shell")
    const [exampleCode, setExampleCode] = useState("")

    useEffect(() => {
        setBreadcrumbs([{ title: "Dashboard" }])
        setStack("shell")
    }, [])

    useEffect(() => {
        const name = cronName.replaceAll(" ", "-") ?? ""

        if (stack === "shell") {
            setExampleCode(`curl -X POST -d '{"name": "${name}"}' https://gilus.api/crons`)
        } else {
            setExampleCode(`import requests\n
            \n
            response = requests.post(\n
                \t'https://gilus.api/crons',\n
                \tjson={"name": "${name}"}\n
            )`)
        }
    }, [stack, cronName])

    return (
        <>
            <Title level={4}>👋 Olá, Bem vindo ao Gilus</Title>
            <Content
                style={{margin: "1rem", justifyContent: "center", display: "flex"}}
            >
                <div
                    style={{
                        display: "flex",
                        margin: "0 auto",
                        paddingTop: "5rem",
                        width: "70vw",
                        height: "auto",
                    }}
                >
                    <div style={{flex: 1}}>
                        <Lottie
                            options={{
                                animationData: CloudAnimation,
                            }}
                            width={450}
                            height={400}
                        />
                        <Typography>
                            Visualize as últimas execuções de suas crons.
                            <Button>Visualizar</Button> 
                        </Typography>
                    </div>
                    <div style={{
                        width: 1,
                        border: "1px dashed rgba(0,0,0,0.15)",
                        height: "100%",
                        display: "flex",
                    }}></div>
                    <div style={{flex: 1, padding: "1rem 4rem"}}>
                        <Typography>
                            Integre uma nova cron com o Gilus:
                        </Typography>
                        <Input 
                            placeholder="Nome da cron"
                            autoComplete="false"
                            value={cronName}
                            onChange={(e) => setCronName(e.target.value)}
                        />
                        <Typography>
                            Projeto utiliza:
                        </Typography>
                            <Select 
                                options={[
                                    { label: "Shell", value: "shell" },
                                    { label: "Python", value: "python" },
                                ]}
                                style={{ width: "100%" }}
                                value={stack}
                                onChange={(v) => setStack(v)}
                            />
                        <div
                            style={{ 
                                fontFamily: "monospace",
                                marginTop: "1rem",
                                background: "rgb(251, 209, 176)",
                                padding: "0.75rem",
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            {exampleCode.split("\n").map((l) => (
                                <>
                                    <p>{l.replace("\t", "    ")}</p>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default Dashboard