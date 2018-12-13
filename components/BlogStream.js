import '@babel/polyfill'
import React, { Fragment } from 'react';
const { Client } = require('dsteem')

const client = new Client('https://api.steemit.com')

class BlogStream extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'title'
        }
    }
    render() {
        return (
            <Fragment>
                <div>Blog Stream placeholder: {this.state.title}</div>
            </Fragment>
        )
    }
}

export default BlogStream