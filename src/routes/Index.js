import React from 'react';
import { connect } from 'dva';
import { Link ,routerRedux } from 'dva/router';
import ProductList from '../components/ProductList';
import { NavBar, Tabs, TabBar, SearchBar,  Flex, Icon, InputItem, SegmentedControl} from 'antd-mobile';
import styles from './Index.css';
import util from '../utils/util.js'

class IndexPage extends React.Component {
    constructor(props){
        super(props);
		this.state = {
            bookType: 'female'
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
    changeBookType=(type)=>{
        this.setState({
            bookType: type
        })
    }
    componentWillReceiveProps=(nextprops)=>{
    }
    render=()=>{
        const { bookTypeList } = this.props;
        console.log('============')
        console.log(bookTypeList)
        return (
            <div>
                <div className="basic_bg">
                    <SearchBar placeholder="书名、作者" maxLength={20} />
                </div>
                <div className={styles.basicBg}>
                    <Flex>
                        <Flex.Item className={styles.indexFemale} onClick={()=>{this.changeBookType('female')}}>
                            {bookTypeList.female ? '女 生' : 'ee'}
                        </Flex.Item>
                        <Flex.Item className={styles.indexMale} onClick={()=>{this.changeBookType('male')}}>
                            {bookTypeList.male ? '男 生' : 'ee'}
                        </Flex.Item>
                        <Flex.Item className={styles.indexPicture} onClick={()=>{this.changeBookType('picture')}}>
                            {bookTypeList.picture ? '漫 画' : 'ee'}
                        </Flex.Item>
                        <Flex.Item className={styles.indexPress} onClick={()=>{this.changeBookType('press')}}>
                            {bookTypeList.press ? '出 版' : 'ee'}
                        </Flex.Item>
                    </Flex>
                </div>
                <div  style={{marginTop: 10,overflow: 'hidden',padding:'0 5px'}}>
                    {bookTypeList && bookTypeList[this.state.bookType] && bookTypeList[this.state.bookType].map((item, index)=>{
                            return <div className={styles.bookTypeBox} key={index}>
                                <Link to={{ pathname: "/bookTypeInfo",search: util.initQuery({gender: this.state.bookType, major: item.name})}}>
                                    <div style={{background: '#fff',overflow: 'hidden',padding: 10,position: 'relative'}}>
                                        <div className={styles.bookTypeBoxName}>
                                            <h3 >{item.name}</h3>
                                            <p >共{item.bookCount}本</p>
                                        </div>
                                        <div style={{height: 240,overflow: 'hidden'}}>
                                            <img width="100%" src={'http://statics.zhuishushenqi.com'+item.bookCover[0]} alt=""/>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                       })
                    }
                </div>
            </div>
        );
    }
};

export default connect(state => state.index)(IndexPage);