/**
 * Created by Administrator on 2016/5/17.
 */
var React=require('react');
var hashHistory=require("react-router").hashHistory;
var HotItem=React.createClass({
    toDetail:function(event){
        hashHistory.push("/details?id="+event.target.getAttribute("data")+'&uid='+this.props.uid);
    },
    add:function(event){
        if(!this.props.uid){
            hashHistory.push("/login");
        }else{
            $.ajax({
                type:'post',
                url:'/cart/add',
                data:{
                    pid:event.target.getAttribute("data"),
                    uid:this.props.uid
                },
                success:function(){
                    hashHistory.push('/?uid='+this.props.uid);
                }.bind(this)
            });
        }

    },
    render:function(){
        var data=this.props.dataHot.product;
        return(
            <div  className="show_product_box_cell fl">
                <div className="img_box" >
                    <img className="show" src={data.imgPathS[1]} alt="img"/>
                    <img className="hide" onClick={this.toDetail} src={data.imgPathS[0]} data={data['_id']} alt="img"/>
                    <div className="cart_icon fr">
                        <strong onClick={this.add} data={data['_id']}>+</strong>
                        <span className="cart_icon_handle"></span>
                    </div>
                </div>
                <div className="text_box">
                    <h5>{data.category}</h5>
                    <p>{data.name}</p>
                    <span>{data.price}</span>
                </div>
            </div>
        )
    }
});
exports.HotItem=HotItem;