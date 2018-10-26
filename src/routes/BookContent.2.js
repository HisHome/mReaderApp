import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { StickyContainer, Sticky } from 'react-sticky';

import { NavBar, Tabs, Progress, Button, Flex, Icon, ListView, Popover, SegmentedControl, Drawer, PullToRefresh } from 'antd-mobile';
import styles from './BookContent.less';
import util from '../utils/util';
import { array } from 'prop-types';
import Item from 'antd-mobile/lib/popover/Item';

class BookContent extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        this.state = {
            dataSource: dataSource,
            isLoading: true,

            bookType: 'female',
            type: 'hot',
            minor: '',
            isShowOther: false,
            open: false,
            startNum: 0,
            endNum: 0,
            height: document.documentElement.clientHeight,
            down: true,
            refreshing: false,
            bookContentList: [],
            fontSize: 0.3,
            bgColor: '#eee6dd',
            fontColor: '#5c5d58',
            selectedIndex: 0,
        };
    }

    componentDidMount() {

        var target = document.getElementById("bookContentBox");
        let _this = this;
        window.touch.on(target, 'swipeleft', function (ev) {
            console.log("向左滑动.");
        });
        window.touch.on(target, 'swipeup', function (ev) {
            console.log("向up滑动.");
            console.log("11111");
            _this.changeType(false)

        });
        window.touch.on(target, 'swipedown', function (ev) {
            console.log("向swipedown滑动.");
            console.log("2222");
            _this.changeType(true)
        });
        window.touch.on(target, 'hold', function (ev) {
            console.log("hold----");
        });
        window.touch.on(target, 'tap', (ev) => {
            console.log("tap----");
            this.setState({
                isShowOther: !this.state.isShowOther
            })
        });
        // if (this.props.bookContent){
        //     let arr = []
        //     arr.push(this.props.bookContent)
        //     this.setState({bookContentList: arr})
        // }

    }
    changeType = (bool) => {
        this.setState({
            down: bool
        })
    }
    onOpenChange = () => {
        this.setState({ open: !this.state.open });
    }
    clickChapter = (index) => {
        this.setState({ startNum: index, endNum: index, bookContentList: [] }, () => {
            this.getNewContent()
        })
    }
    getNewContent = (isDown) => {
        this.props.dispatch({
            type: 'bookContent/bookContent',
            payload: {
                chapterLink: this.props.bookCapterList[isDown ? this.state.startNum : this.state.endNum].link,
            }
        }).then(() => {
            this.setState({ open: false, refreshing: false });
        })
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.bookContent && nextProps.bookContent.chapter) {
            console.log('=====1111=======')
            let arr = this.state.bookContentList
            if (this.state.down) {
                arr.unshift(nextProps.bookContent)
            } else {
                arr.push(nextProps.bookContent)
            }
            this.setState({ bookContentList: arr }, () => {
                this.setBookContentList()
            })
        }
    }
    initData = (arr) => {
        let obj = {
            dataBlobs: {},
            sectionIDs: [],
            rowIDs: []
        }
        if (arr && arr.length) {
            arr.forEach((item, index) => {
                obj.dataBlobs[`title${index}`] = item.chapter ? item.chapter.title : '未知';
                obj.dataBlobs[`chapterContent${index}`] = item.chapter ? item.chapter.cpContent : '没有内容';
                obj.sectionIDs.push(`title${index}`)
                obj.rowIDs.push([`chapterContent${index}`])
            });
        }
        return obj
    }
    setBookContentList = (bookContent) => {
        let obj = this.initData(this.state.bookContentList)
        console.log('==============')
        console.log(obj)
        this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.cloneWithRowsAndSections(
                obj.dataBlobs,
                obj.sectionIDs,
                obj.rowIDs
            ),
        })
    }
    onEndReached = (event) => {
        console.log(121212)
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({ isLoading: true }, () => {
            this.setBookContentList(this.props.bookContent)
        });
    }
    render() {
        const { bookContent, bookCapterList } = this.props;
        const sidebar = (<div>
            <p className={styles.chapterTitle}>目录</p>
            {bookCapterList && bookCapterList.map((item, index) => {
                return (<p onClick={() => { this.clickChapter(index) }} className={styles.chapterName} key={index} >{index + 1}-{item.title}</p>);
            })}
        </div>);
        const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

        return (
            <div id="target">
                <Drawer
                    className={`bookDrawer ${styles.bookDrawer}`}
                    style={{ minHeight: document.documentElement.clientHeight }}
                    // enableDragHandle
                    contentStyle={{}}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    {this.state.isShowOther
                        ? <div className={styles.bookNavBar}>
                            <NavBar
                                mode="light"
                                icon={<Link to={{
                                    pathname: '/bookDetail',
                                    search: util.initQuery({ book: util.getQuery().book })
                                }}>
                                    <Icon type="left" />
                                </Link>}
                                onLeftClick={() => console.log('onLeftClick')}
                                rightContent={
                                    <Popover
                                        overlayClassName="fortest"
                                        overlayStyle={{ color: 'currentColor' }}
                                        visible={this.state.visible}
                                        overlay={[
                                            (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">
                                                <Link to={{ pathname: '/' }}> 首页 </Link>
                                            </Item>),
                                            (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>排行</Item>),
                                        ]}
                                        align={{
                                            overflow: { adjustY: 0, adjustX: 0 },
                                            offset: [0, 0],
                                        }}
                                        onVisibleChange={this.changeSearch}
                                        onSelect={this.changeSearch}
                                    >
                                        <Icon key="1" type="ellipsis" />
                                    </Popover>
                                }
                            >{bookContent.chapter ? bookContent.chapter.title : ''}</NavBar>
                        </div>
                        : ""
                    }
                    <div id="bookContentBox" >
                        <ListView
                            ref={el => this.lv = el}
                            dataSource={this.state.dataSource}
                            className="am-list sticky-list"
                            useBodyScroll
                            renderSectionWrapper={sectionID => (
                                <StickyContainer
                                    key={`s_${sectionID}_c`}
                                    className="sticky-container"
                                    style={{ zIndex: 1004, background: this.state.bgColor }}
                                />
                            )}
                            renderSectionHeader={sectionData => {
                                return <Sticky>
                                    {({ style }) => (
                                        <div
                                            className="sticky"
                                            style={{
                                                ...style,
                                                zIndex: 1,
                                                background: this.state.bgColor,
                                                color: '#5c5d58',
                                                padding: '0.14rem 0.3rem',
                                                borderBottom: '1px solid rgb(222, 210, 210)'
                                            }}
                                        >{sectionData}</div>
                                    )}
                                </Sticky>
                            }}
                            renderHeader={null}
                            renderFooter={null}
                            renderRow={(rowData, sectionID, rowID) => {
                                console.log('=============')
                                return (
                                    <div key={rowID} className={styles.bookContentBox} style={{ fontSize: `${this.state.fontSize}rem`, color: this.state.fontColor }}>
                                        <div>
                                            {util.initContent(rowData ? rowData : '').map((item, index) => {
                                                return <p className={styles.bookSection} key={index}>{item ? item.replace(/\s/g, '') : ''}</p>
                                            })}
                                        </div>
                                    </div>
                                );
                            }}
                            pageSize={1}
                            onScroll={() => { console.log('scroll'); }}
                            scrollEventThrottle={200}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={10}
                        />
                    </div>
                    {this.state.isShowOther
                        ? <div className={styles.bookFooter}>
                            <div className={styles.bookProgress}>
                                <span className={styles.bookFontSizeLeft} onClick={() => { if (this.state.fontSize <= 0.2) return; this.setState({ fontSize: this.state.fontSize - 0.02 }) }}>Aa- </span>
                                <Progress percent={parseInt((this.state.fontSize - 0.2) / 0.26 * 100)} position="normal" unfilled={true} appearTransition />
                                <span className={styles.bookFontSizeRight} onClick={() => { if (this.state.fontSize >= 0.46) return; this.setState({ fontSize: this.state.fontSize + 0.02 }) }}>Aa+ </span>
                            </div>
                            <div className={styles.bookReadType}>
                                <SegmentedControl
                                    values={['默认', '夜间', '护眼']}
                                    tintColor={'#333'}
                                    style={{ height: '40px', width: '100%' }}
                                    selectedIndex={this.state.selectedIndex}
                                    onChange={(e) => {
                                        this.setState({
                                            bgColor: ['#eee6dd', '#333', '#b8cd8d'][e.nativeEvent.selectedSegmentIndex],
                                            fontColor: ['#5c5d58', '#ccc', '#5c5d58'][e.nativeEvent.selectedSegmentIndex],
                                            selectedIndex: e.nativeEvent.selectedSegmentIndex,
                                        })
                                    }}
                                />
                            </div>
                            <Flex className={styles.bookJump}>
                                <Flex.Item className="center" ><span onClick={() => {
                                    let startNum = this.state.startNum
                                    if (startNum > 0) {
                                        startNum = startNum - 1;
                                    } else {
                                        return;
                                    }
                                    this.setState({ startNum: startNum }, () => {
                                        this.getNewContent(true)
                                    });
                                }}>上一章</span></Flex.Item>
                                <Flex.Item className="center" ><span onClick={() => { this.setState({ open: true, isShowOther: false }) }}>目录</span></Flex.Item>
                                <Flex.Item className="center" ><span onClick={() => {
                                    let endNum = this.state.endNum
                                    if (endNum < this.props.bookCapterList.length - 1) {
                                        endNum = endNum + 1;
                                    } else {
                                        return;
                                    }
                                    this.setState({ endNum: endNum }, () => {
                                        this.getNewContent(false)
                                    });
                                }}>下一章</span></Flex.Item>
                            </Flex>
                        </div>
                        : ''
                    }
                </Drawer>
            </div>
        );
    }
};

export default connect(state => state.bookContent)(BookContent);