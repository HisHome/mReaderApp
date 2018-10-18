import React from 'react';
import { connect } from 'dva';
import { Link ,routerRedux } from 'dva/router';

import { NavBar, Tabs, TabBar, Button,  Flex, Icon, InputItem, SegmentedControl} from 'antd-mobile';
import styles from './BookDetail.less';
import util from '../utils/util';
import { array } from 'prop-types';
import Item from 'antd-mobile/lib/popover/Item';

class BookContent extends React.Component {
    constructor(props){
        super(props);
		this.state = {
            bookType: 'female',
            type: 'hot',
            minor: ''
		};
    }
    componentDidMount = () => {
    }
    click = () => {
        this.props.dispatch({
            type: 'products/getBookType',
            payload: {}
        })
    }
    changeSearch=(data)=>{
        this.setState({
            ...data
        },()=>{
            this.props.dispatch({
                type: 'bookTypeInfo/getBookTypeInfo',
                payload: {
                    ...util.getQuery(),
                    type: this.state.type,
                    minor: this.state.minor
                }
            })
        })
    }
    componentWillReceiveProps=(nextprops)=>{
    }
    render=()=>{
        const { bookContent } = this.props;
        return (
            <div>
                <div style={{background: '#ececec', padding: '20px'}}>
                    <Link to={{
                        pathname:'/',
                        // search: util.initQuery({gender: bookDetail.gender ? bookDetail.gender[0] : '',major: bookDetail.majorCate})
                    }}>
                        首页
                    </Link>
                    <h3 style={{padding: '20px'}}>{bookContent.chapter ? bookContent.chapter.title : ''}</h3>
                    <div style={{lineHeight: '20px',color: '#666'}}>
                        {bookContent.chapter ? bookContent.chapter.cpContent : ''}
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(state => state.bookContent)(BookContent);