import React from 'react';
import { connect } from 'dva';
import { Link ,routerRedux } from 'dva/router';

import { NavBar, Tabs, TabBar, SearchBar,  Flex, Icon, InputItem, SegmentedControl} from 'antd-mobile';
import styles from '../less/bookRankInfo.less';
import util from '../utils/util';
import { array } from 'prop-types';
import { SIGCHLD } from 'constants';

class BookRankInfo extends React.Component {
    constructor(props){
        super(props);
		this.state = {
            bookType: 'female',
            type: 1,
            typeList: null
		};
    }
    componentDidMount = () => {
        console.log(this.props.bookRankInfo)
    }
    changeType=(val)=>{
        this.setState({
            type: val
        },()=>{
            this.getData();
        })
    }
    getData = () => {
        this.props.dispatch({
            type: 'bookRankInfo/getBookRanking',
            payload: {
                id: this.state.typeList[this.state.type]
            }
        })
    }
    componentWillReceiveProps=(nextprops)=>{
        if (nextprops.bookRankInfo && nextprops.bookRankInfo.ranking && !this.state.typeList){
            let arr = [];
            arr.push('')
            arr.push(nextprops.bookRankInfo.ranking.id)
            arr.push(nextprops.bookRankInfo.ranking.monthRank)
            arr.push(nextprops.bookRankInfo.ranking.totalRank)
            this.setState({typeList: arr})
        }
    }
    render=()=>{
        const { bookRankInfo } = this.props;
        return (
            <div className="minheight100">
                    <NavBar
                    mode="light"
                    icon={ <Link to={{
                        pathname:'/bookRanking'
                    }}>
                    <Icon type="left" />
                    </Link> }
                    rightContent={null}
                    >{bookRankInfo.ranking ? bookRankInfo.ranking.title : ''}</NavBar>
                    <div className={styles.typeBox}>
                        <Flex>
                            <Flex.Item className={`${styles.title} ${this.state.type == 1 ? styles.active :'' }`} onClick={()=>{this.changeType(1)}}>
                                周榜
                            </Flex.Item>
                            <Flex.Item className={`${styles.title} ${this.state.type == 2 ? styles.active :'' }`} onClick={()=>{this.changeType(2)}}>
                                月榜
                            </Flex.Item>
                            <Flex.Item className={`${styles.title} ${this.state.type == 3 ? styles.active :'' }`} onClick={()=>{this.changeType(3)}}>
                                总榜
                            </Flex.Item>
                        </Flex>
                    </div>
                    <div className={styles.bookRankBox}>
                        {bookRankInfo.ranking && bookRankInfo.ranking.books
                            ? bookRankInfo.ranking.books.map((item,index)=>{
                                return <div className={styles.booksRankInfoBox} key={index}>
                                    <Link to={{
                                        pathname:'/bookDetail',
                                        search: util.initQuery({book: item._id, sourceId: 2, id: util.getQuery().id})
                                    }}>
                                        <div className={styles.booksImg}>
                                            <img width="100%" src={'http://statics.zhuishushenqi.com'+item.cover} alt=""/>
                                        </div>
                                        <div className={styles.booksTitleBox}>
                                            <h3 className={styles.booksName}>{item.title}</h3>
                                            <p className={styles.booksAuthor}>{item.author} &nbsp;|&nbsp; {item.majorCate}</p>
                                            <div className={styles.booksDesc} >{item.shortIntro}</div>
                                            <div className={styles.booksKeep}> <span className={styles.redColor}>{util.initNum(item.latelyFollower)}</span>人气 &nbsp;|&nbsp; <span className={styles.redColor}>{item.retentionRatio}%</span>读者留存 </div>
                                        </div>
                                    </Link>
                                </div>
                            })
                            :  bookRankInfo.ok === false 
                                ?  <div style={{textAlign: 'center', padding: '2rem 0'}}>
                                        暂无数据！
                                    </div>
                            
                                :  <div style={{textAlign: 'center', padding: '2rem 0'}}>
                                        <Icon type="loading" size="lg" /> <br /> <span style={{fontSize: '0.28rem'}}>数据加载中...</span>
                                    </div>
                        }
                        <p></p>
                    </div>
            </div>
        );
    }
};

export default connect(state => state.bookRankInfo)(BookRankInfo);