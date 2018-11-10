import React from 'react';
import { connect } from 'dva';
import { Link ,routerRedux } from 'dva/router';

import { NavBar, Tabs, TabBar, SearchBar,  Flex, Icon, InputItem, SegmentedControl} from 'antd-mobile';
import styles from './BookRanking.less';
import util from '../utils/util';
import { array } from 'prop-types';

class BookRanking extends React.Component {
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
    componentWillReceiveProps=(nextprops)=>{
    }
    renderList=(data, type)=>{
        return data.map((item, index)=>{
            if (index === 7){
                return <div key={index} className={`${styles.searchBoxItem} overflow`}>
                    <span  className={`pull-left ${styles.rankingOther}`} ></span>
                    <span className="pull-left" style={{padding: '.19rem 0 0 .14rem'}}>别人家的排行榜</span>
                    <span className="pull-right" style={{paddingTop: '.1rem'}} onClick={()=>{this.setState({[type]: !this.state[type]})}}> {this.state[type] ? <Icon type={'up'} /> : <Icon type={'down'} /> } </span>
                </div>
            } else if (index < 7){
                return <Link to={{
                    pathname:'/bookRankInfo',
                    search: util.initQuery({id: item._id})
                }}>
                   <div key={index} className={`${styles.searchBoxItem} overflow`}>
                        <img className="pull-left" width="34" src={'http://statics.zhuishushenqi.com'+item.cover} alt=""/>
                        <span className="pull-left" style={{padding: '.19rem 0 0 .14rem'}}>{item.title}</span>
                    </div>
                </Link>
            } else if (this.state[type]) {
                return <Link to={{
                    pathname:'/bookRankInfo',
                    search: util.initQuery({id: item._id})
                }}>
                   <div key={index} className={`${styles.searchBoxItem} overflow`}>
                        <span  className={`pull-left ${styles.rankingNull}`} ></span>
                        <span className="pull-left" style={{padding: '.19rem 0 0 .14rem'}}>{item.title}</span>
                    </div>
                </Link>
            }
        })
    }
    render=()=>{
        const { bookRanking } = this.props;
        return (
            <div>
                <div className={styles.rankingBox}>
                    <NavBar
                        mode="light"
                        icon={ <Link to={{
                                pathname:'/'
                            }}>
                            <Icon type="left" />
                        </Link> }
                        rightContent={null}
                        >排行榜</NavBar>
                    { bookRanking && bookRanking.male
                        ?   <div>
                                <div className={styles.rankType}>男生</div>
                                {this.renderList(bookRanking.male, 'maleOther')}
                            </div>
                        :   null
                    }
                    { bookRanking && bookRanking.female
                        ?   <div>
                                <div className={styles.rankType}>女生</div>
                                {this.renderList(bookRanking.female, 'femaleOther')}
                            </div>
                        :   null
                    }
                </div>
            </div>
        );
    }
};

export default connect(state => state.bookRanking)(BookRanking);