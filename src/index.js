import React,{Component} from 'react';
import {render} from 'react-dom';
//import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import jsonp from 'jsonp';
/*
第一部分：实现基本的关联功能
    1.给input绑定值改变事件，当值发生改变时调用对应的监听函数
    2.获取到input框中的值，然后调用百度接口获取数据，并修改状态对象中words属性
    3.调用百度接口时，除了传统方法，还可以用jsonp模块的jsonp函数方法
    具体：npm install jsonp,然后调用即可！
    https://www.baidu.com/su?wd=a&cb=cb
    param是回调函数callback的名字,jsonp函数url参数不是用引号包裹的？？？？
    4.
第二部分：实现上下方向键控制关联列表的样式
    (1)状态加上index (2)li加上触发类名 （3）input搜索框加上onKeyDown事件 
    1.注意className那里需要加上空格！（条件运算符成立及会在后面加上另一个类名）
    2.input的onkeydown事件
    3.用箭头函数不用绑定this,事件函数一般以Handle开头
    4.event.keyCode    向上：keyCode=38   向下：keyCode=40
    5.上下箭头调整时，Input内的值也要跟着变 value={this.state.words[this.state.index]}
*/
export default class Suggest extends Component{
    constructor(){
        super();
        this.state={
            words:[],
            index:-1      //当前选中的索引,li第一个Index为0，Input的index为-1     
        };
    }
    handleChange=(event)=>{
        let wd = event.target.value;
        jsonp(`http://www.baidu.com/su?wd=${wd}`,{
            param:'cb'
        },(err,data)=>{
            console.log(data);
            this.setState({words:data.s})
        })
    }
    handleKeyDown=(event)=>{
        let code = event.keyCode;
        console.log(code);
        //当按下的是向上或向下的箭头键时，触发
        if(code == 38 || 40){
            let index = this.state.index;
            if(code == 38){
                index--
            }else if(code == 40){
                index++
            }
            this.setState({index:index})
        }
    }
    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-8 col-sm-offset-2'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>
                                <input onKeyDown={this.handleKeyDown} value={this.state.words[this.state.index]} type='text' className='form-control' onChange={this.handleChange}/>
                            </div>
                            <div className='panel-body'>
                                <ul className='list-group'>
                                    {
                                        this.state.words.map((word,index)=>
                                            <li key={index} className={'list-group-item '+(index===this.state.index?'active':'')}>{word}</li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        )
    }
}
render(<Suggest/>,document.getElementById('root'));