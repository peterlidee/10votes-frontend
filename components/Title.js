import Head from 'next/head'
import { projectName } from '../projectData'

const Title = props => (
    <Head>
        <title>{projectName} | {props.children}</title>
    </Head>
)

export default Title;