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
    static async getInitialProps() {
        const args = { tag: 'travelfeed', limit: 55 }
        const stream = await client.database.getDiscussions('blog', args)
        return { stream }
    }
    render() {
        let count = 0
        return (
            <Layout>
                <h1>Home</h1>
                <h2>TravelFeed Blog</h2>
                <Grid container spacing={16}>
                    {this.props.stream.map(post => {
                        const json = JSON.parse(post.json_metadata);
                        if (count < 8 && post.author === 'travelfeed' && (json.tags.indexOf('travelfeeddaily') > -1) === true) {
                            const split_body = post.body.split('<br>')
                            const cropped_body = split_body[1] ? split_body[1] : split_body[0]
                            const excerpt = removeMd(cropped_body).substring(0, 350);
                            const image = json.image[0] ? 'https://steemitimages.com/600x400/' + json.image[0] : 'https://steemitimages.com/640x640/https://cdn.steemitimages.com/DQmPmEJ5NudyR5Vhh5X36U1qY8FgM5iuaN1Smc5N55cr363/default-header.png'
                            count += 1
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
                </Grid>
            </Layout>
        )
    }
}

export default withStyles(styles)(Index)