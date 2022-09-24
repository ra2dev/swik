import {Layout} from "../components/layout"
import {RaycastCMDK} from "../components/NextEditor"
import {FramerCMDK} from "../components/FramerSample"

export default function Home() {
    return (
        <Layout>
            <FramerCMDK />
            <br />
            <RaycastCMDK />
        </Layout>
    )
}
