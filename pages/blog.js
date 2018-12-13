import '@babel/polyfill'
import Layout from '../components/Layout.js'
const { Client } = require('dsteem')
import Link from 'next/link'
const removeMd = require('remove-markdown');
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';

const client = new Client('https://api.steemit.com')

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

class Index extends React.Component {
    state = {
        error: false,
        hasMore: true,
        isLoading: false,
        lastauthor: '',
        lastpermlink: '',
        loadposts: []
    };
    streamBlog = async () => {
        let lastpermlink = this.state.lastpermlink
        let lastauthor = this.state.lastauthor
        if (lastpermlink === '') {
            const tagargs = { tag: 'travelfeed', limit: 51 }
            const tagstream = await client.database.getDiscussions('blog', tagargs)
            lastpermlink = tagstream.length > 0 ? tagstream[tagstream.length - 1].permlink : ''
            lastauthor = tagstream.length > 0 ? tagstream[tagstream.length - 1].author : ''
        }
        const args = { tag: 'travelfeed', limit: 50, start_author: lastauthor, start_permlink: lastpermlink }
        const stream = await client.database.getDiscussions('blog', args)
        lastpermlink = stream.length > 0 ? stream[stream.length - 1].permlink : ''
        lastauthor = stream.length > 0 ? stream[stream.length - 1].author : ''
        const loadposts = this.state.loadposts.concat(stream)
        this.setState({
            lastpermlink: lastpermlink,
            lastauthor: lastauthor,
            loadposts: loadposts
        });
    }
    componentDidMount() {
        window.onscroll = () => {
            const {
                streamBlog,
                state: {
                    error,
                    isLoading,
                    hasMore,
                },
            } = this;
            if (error || isLoading || !hasMore) return;
            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.scrollHeight
            ) {
                streamBlog();
            }
        };
    }
    static async getInitialProps() {
        const args = { tag: 'travelfeed', limit: 50 };
        const stream = await client.database.getDiscussions('blog', args)
        return { stream }
    }
    render() {
        const stream = this.props.stream.concat(this.state.loadposts)
        const {
            error,
            hasMore,
            isLoading
        } = this.state
        let count = 0
        let pos = 0
        let processed = []
        return (
            <Layout>
                <h1>TravelFeed Blog</h1>
                <Grid container spacing={16}>
                    {stream.map(post => {
                        const json = JSON.parse(post.json_metadata);
                        // Filter out:
                        // - Filter out duplicates. This does not work for some reason..
                        // - Limit initial fetch to 7 posts
                        // - Exclude resteems
                        if ((((processed.indexOf(post.permlink) > -1) === false) && count < 7 || stream.length > 50) && post.author === 'travelfeed') {
                            let excerpt = post.body
                            if ((json.tags.indexOf('travelfeeddaily') > -1) === true) {
                                excerpt = excerpt.split('<br>')
                            }
                            excerpt = excerpt.length > 0 ? excerpt[1] : excerpt[0]
                            excerpt = removeMd(excerpt).substring(0, 350);
                            const image = (typeof json.image != "undefined" && json.image.length > 0 && json.image[0] !== '') ? 'https://steemitimages.com/600x400/' + json.image[0] : 'https://steemitimages.com/640x640/https://cdn.steemitimages.com/DQmPmEJ5NudyR5Vhh5X36U1qY8FgM5iuaN1Smc5N55cr363/default-header.png'
                            //todo: try fetching first image from post if no image is defined in json_metadata
                            ++count
                            processed.push(post.permlink)
                            return (
                                <Grid item lg={3} md={4} sm={6} xs={12}>
                                    <Card key={post.permlink}>
                                        <CardActionArea>
                                            <CardMedia
                                                image={image}
                                                title="Contemplative Reptile"
                                            /><Link as={`/@${post.author}/${post.permlink}`} href={`/post?author=${post.author}&permlink=${post.permlink}`}>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {post.title}
                                                    </Typography>
                                                    <Typography component="p">
                                                        {excerpt}[...]
                                        </Typography>
                                                </CardContent>
                                            </Link>
                                        </CardActionArea>
                                        <CardActions>
                                            <IconButton aria-label="Upvote">
                                                <FavoriteIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        }
                    })}
                    {
                        error &&
                        <Card>{error}</Card>
                    }
                    {
                        isLoading &&
                        <Card>Loading...</Card>
                    }
                    {
                        !hasMore &&
                        <Card>That is all!</Card>
                    }
                </Grid>
            </Layout>
        )
    }
}

export default withStyles(styles)(Index)