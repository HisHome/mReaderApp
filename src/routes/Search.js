import React from 'react';
import { connect } from 'dva';
import { Link ,routerRedux } from 'dva/router';
import ProductList from '../components/ProductList';
import { NavBar, Tabs, TabBar, SearchBar,  Flex, Icon, InputItem, SegmentedControl, Toast} from 'antd-mobile';
import styles from '../less/bookRankInfo.less';
import util from '../utils/util.js'

class Search extends React.Component {
    constructor(props){
        super(props);
		this.state = {
		};
    }
    componentDidMount = () => {
    }
    submitData=(val)=>{
        if (!val){
            Toast.info('还未输入搜索内容');
            return;
        } 
        this.props.dispatch(routerRedux.push({
            pathname: '/search',
            search: util.initQuery({query: val})
        }))
    }
    componentWillReceiveProps=(nextprops)=>{
    }
    render=()=>{
        const { searchBook } = this.props;
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={ <Link to={{
                        pathname:'/'
                    }}>
                    <Icon type="left" />
                    </Link> }
                    rightContent={null}
                    >跟“{util.getQuery().query}”有关的书籍</NavBar>
                <div className="basic_bg">
                    <SearchBar placeholder="书名、作者" defaultValue={util.getQuery().query || ''} maxLength={20} onSubmit={this.submitData} />
                </div>
                {searchBook && searchBook.books && searchBook.books.length   
                    ?   <div  style={{marginTop: 10,overflow: 'hidden',padding:'0 5px'}}>
                            {searchBook.books.map((item, index)=>{
                                    return <div className={styles.booksRankInfoBox} key={index}>
                                    <Link to={{
                                        pathname:'/bookDetail',
                                        search: util.initQuery({book: item._id, sourceId: 0, id: util.getQuery().id})
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
                            }
                        </div>
                    : searchBook && searchBook.ok
                        ?   <div style={{textAlign: 'center', padding: '2rem 0'}}>
                                <span style={{fontSize: '0.28rem'}}>未搜索到书籍</span>
                            </div>
                        :  <div style={{textAlign: 'center', padding: '2rem 0'}}>
                            <Icon type="loading" size="lg" /> <br /> <span style={{fontSize: '0.28rem'}}>数据加载中...</span>
                        </div>
                }
            </div>
        );
    }
};

export default connect(state => state.search)(Search);