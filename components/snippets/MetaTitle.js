import Head from 'next/head'
import { projectName } from '../../projectData'

const MetaTitle = props => (
    <Head>
        <title>{projectName} | {props.children}</title>
    </Head>
)

export default MetaTitle;