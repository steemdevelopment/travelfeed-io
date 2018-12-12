import '@babel/polyfill'
import Layout from '../components/MyLayout.js'
const { Client } = require('dsteem')

const client = new Client('https://api.steemit.com')

const Post = (props) => (
    <Layout>
        <h1>{props.blog.post.title}</h1>
        <p>{props.blog.post.body}</p>
        {/* <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p> */}
        {/* <img src={props.show.image.medium} /> */}
    </Layout>
)

Post.getInitialProps = async function (context) {
    const { author } = context.query
    const { permlink } = context.query

    const props = await client.database.getChainProperties()
    console.log(`Maximum blocksize consensus: ${props.maximum_block_size} bytes`)
    // client.disconnect()

    const blog = { post: { title: 'The title', body: `${props.maximum_block_size}` } }

    return { blog }
}

export default Post