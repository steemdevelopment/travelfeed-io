import '@babel/polyfill'
import Layout from '../components/Layout.js'
const { Client } = require('dsteem')
import Link from 'next/link'

const client = new Client('https://api.steemit.com')

class Index extends React.Component {
    static async getInitialProps() {
        const args = { tag: 'travelfeed', limit: 50 }
        const stream = await client.database.getDiscussions('blog', args)
        return { stream }
    }
    render() {
        return (
            <Layout>
                <h1>Home</h1>
                <h2>TravelFeed Blog</h2>
                <ul>
                    {this.props.stream.map(post => {
                        if (post.author == 'travelfeed') {
                            return (
                                <li key={post.author + '/' + post.permlink}>
                                    <Link as={`/@${post.author}/${post.permlink}`} href={`/post?author=${post.author}&permlink=${post.permlink}`}>
                                        <a>{post.title}</a>
                                    </Link>
                                </li>
                            )
                        }
                    })}
                </ul>
            </Layout>
        )
    }
}

export default Index