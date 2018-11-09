import React from 'react';
import { connect } from 'dva';
import { Link ,routerRedux } from 'dva/router';

import { NavBar, Tabs, TabBar, SearchBar,  Flex, Icon, InputItem, SegmentedControl} from 'antd-mobile';
import styles from '../less/bookRankInfo.less';
import util from '../utils/util';
import { array } from 'prop-types';

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
            <div>
                <div className={styles.rankingBox}>
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
                    <div>
                        {bookRankInfo.ranking && bookRankInfo.ranking.books
                            ? bookRankInfo.ranking.books.map((item)=>{
                                return <p>{item.title}</p>
                            })
                            : '暂无内容'
                        }
                        <p></p>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(state => state.bookRankInfo)(BookRankInfo);