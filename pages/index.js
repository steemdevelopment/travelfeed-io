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
        let count = 0
        return (
            <Layout>
                <h1>Home</h1>
                <h2>TravelFeed Blog</h2>
                <ul>
                    {this.props.stream.map(post => {
                        const json = JSON.parse(post.json_metadata);
                        if (count < 7 && post.author === 'travelfeed' && (json.tags.indexOf('travelfeeddaily') > -1) === true) {
                            count += 1
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