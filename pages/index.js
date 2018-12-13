import Layout from '../components/MyLayout.js'
import BlogStream from '../components/BlogStream.js'
import Link from 'next/link'

const Index = (props) => (
    <Layout>
        <BlogStream />
        <h1>Example Posts</h1>
        <ul>
            {props.posts.map(({ post }) => (
                <li key={post.author + '/' + post.permlink}>
                    <Link as={`/@${post.author}/${post.permlink}`} href={`/post?author=${post.author}&permlink=${post.permlink}`}>
                        <a>{post.title}</a>
                    </Link>
                </li>
            ))}
        </ul>
        <style jsx>{`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
    </Layout>
)

Index.getInitialProps = async function () {
    const data = [{ "post": { "author": "jpphotography", "permlink": "world-ocean-tuesday-mui-ne-sunset-vietnam", "title": "World Ocean Tuesday: Mui Ne Sunset, Vietnam" } }]

    return {
        posts: data
    }
}

export default Index