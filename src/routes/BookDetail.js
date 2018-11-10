import React from 'react';
import { connect } from 'dva';
import { Link ,routerRedux } from 'dva/router';

import { NavBar, Tabs, TabBar, Button,  Flex, Icon, InputItem, SegmentedControl} from 'antd-mobile';
import styles from './BookDetail.less';
import util from '../utils/util';
import { array } from 'prop-types';
import Item from 'antd-mobile/lib/popover/Item';

class BookDetail extends React.Component {
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
    initObjData=()=>{
       let num = util.getQuery().sourceId
       let bookDetail = this.props.bookDetail;
       let obj = {}
       if (num == 1){
            obj = {
                gender: bookDetail.gender ? bookDetail.gender[0] : '',
                major: bookDetail.majorCate
            }
       } else if (num ==2) {
            obj = {
                id: util.getQuery().id
            }
       }
       return obj;
    }
    render=()=>{
        const { bookDetail, bookReview } = this.props;
        return (
            <div>
                <div className={`overflow ${styles.bookBack}`}>
                    <Link to={{
                        pathname: util.getDetailBackUrl(util.getQuery().sourceId),
                        search: util.initQuery(this.initObjData())
                    }}>
                        <Icon type="left" />
                    </Link>
                </div>
                <div className={`center ${styles.bookBox}`}>
                    <div className={styles.imgBox}>
                        <img width="100%" src={'http://statics.zhuishushenqi.com'+bookDetail.cover} alt=""/>
                    </div>
                    <div>
                        <h3 className={styles.bookName}>{bookDetail.title}</h3>
                        <p className={styles.booksAuthor}>{bookDetail.author}</p>
                    </div>
                    <div className={styles.bookBtnBox}>
                        <Button className={styles.bookBtn} size="small" >&nbsp;加入书架&nbsp;</Button> &nbsp; &nbsp;
                        <Link to={{
                            pathname:'/bookContent',
                            search: util.initQuery({book: bookDetail._id, id: util.getQuery().id, sourceId: util.getQuery().sourceId})
                        }}>
                            <Button className={styles.bookBtn} size="small" type="warning">&nbsp;开始阅读&nbsp;</Button>
                        </Link>
                    </div>
                </div>
                <div className={styles.bookInfoBox}>
                    <div className={`center ${styles.bookTips}`}>
                        <p>字数:{ util.initNum( bookDetail.wordCount) } <span className={styles.isOver}>{bookDetail.isSerial ? '连载中' : '完结'}</span></p>
                        <p>追人气:{ util.initNum( bookDetail.latelyFollower) } 读者留存率:{bookDetail.retentionRatio}%  日更日数/天:{bookDetail.serializeWordCount}</p>
                    </div>
                    <div className={styles.bookDesc}>
                        {bookDetail.longIntro}
                    </div>
                    <div className={styles.catalogue}>
                        目录 <span className="pull-right">{bookDetail.lastChapter}</span>
                    </div>
                    <div className={styles.bookReviews}>
                        <div className={styles.bookHotTitle}>
                            <span>热门书评</span>
                            <Link className="pull-right" to={{
                                pathname:'/bookDetail',
                                search: util.initQuery({bookId: 111})
                            }}>
                            更多书评
                            </Link>
                        </div>
                        {bookReview && bookReview.map((item, index)=>{
                            return <div className={`overflow ${styles.bookReviewBox}`} key={index}>
                                <div className={`pull-left ${styles.bookReviewImg}`}>
                                    <img width="100%" src={'http://statics.zhuishushenqi.com'+item.author.avatar} alt=""/>
                                </div>
                                <div className={styles.bookReviewInfo}>
                                    <h4 className={styles.nickname}>{item.author.nickname}</h4>
                                    <h4>{item.title}</h4>
                                    <div>{item.rating}颗星</div>
                                    <div className={styles.bookReviewContent}>
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(state => state.bookDetail)(BookDetail);