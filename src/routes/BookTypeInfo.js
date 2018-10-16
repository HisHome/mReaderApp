import React from 'react';
import { connect } from 'dva';
import { Link ,routerRedux } from 'dva/router';

import { NavBar, Tabs, TabBar, SearchBar,  Flex, Icon, InputItem, SegmentedControl} from 'antd-mobile';
import styles from './BookTypeInfo.css';
import util from '../utils/util';
import { array } from 'prop-types';

class BookTypeInfo extends React.Component {
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
        const { bookTypeInfo, bookSearchList, bookMinor } = this.props;
        console.log('=========');
        console.log(bookTypeInfo);
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.dispatch(routerRedux.push({
                        pathname: '/'
                    }))}
                    rightContent={<span>首页</span>}
                > {util.getQuery().major} </NavBar>
                <div className={styles.searchBox}>
                    <div className={styles.searchBoxItem}>
                        {bookSearchList.map((item, index)=>{
                            return <span  onClick={()=>{this.changeSearch({type: item.value})}} className={`${styles.searchType} ${item.value == this.state.type ? styles.active : ''}`} key={index}>{item.name}</span>
                        })}
                    </div>
                    <div className={styles.searchBoxItem}>
                        {bookMinor.map((item, index)=>{
                            return <span onClick={()=>{this.changeSearch({minor: item})}} className={`${styles.searchType} ${item == this.state.minor ? styles.active : ''}`} key={index}>{item || '全部'}</span>
                        })}
                    </div>
                </div>
                <div  className={styles.booksInfo}>
                    {bookTypeInfo && bookTypeInfo.books && bookTypeInfo.books.map((item,index)=>{
                        return <div className={styles.booksInfoBox} key={index}>
                            <div className={styles.booksImg}>
                                <img width="100%" src={'http://statics.zhuishushenqi.com'+item.cover} alt=""/>
                            </div>
                            <div className={styles.booksTitleBox}>
                                <h3 className={styles.booksName}>{item.title}</h3>
                                <p className={styles.booksAuthor}>{item.author} &nbsp;|&nbsp; {item.majorCate}</p>
                                <div className={styles.booksDesc} >{item.shortIntro}</div>
                                <div className={styles.booksKeep}> <span className={styles.redColor}>{util.initNum(item.latelyFollower)}</span>人气 &nbsp;|&nbsp; <span className={styles.redColor}>{item.retentionRatio}%</span>读者留存 </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        );
    }
};

export default connect(state => state.bookTypeInfo)(BookTypeInfo);