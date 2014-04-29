/**
 * Created by Peter on 14-4-15.
 */
function getAxisFormat(name){

    var tempformat;
    switch (name){
        case "tuition03_tf":
            tempformat = "$";
            break;
        case "tot_rev_w_auxother_sum":
            tempformat = "$s";
            break;
        default :
            tempformat = "";
    }

    return d3.format(tempformat);
}

function getLabelText(lable){
    console.log(lable)
    var text;
    switch (lable){
        case "tuition03_tf":
            text = "Tuition";
            break;
        case "tot_rev_w_auxother_sum":
            text = "Total Revenue";
            break;
        case "total_enrollment":
            text = "Enrollment";
            break;
        case "all_employees":
            text = "Employee";
            break;
    }
    return text;
}


function mSift_SeekTp(oObj,nDire){if(oObj.getBoundingClientRect&&!document.all){var oDc=document.documentElement;switch(nDire){case 0:return oObj.getBoundingClientRect().top+oDc.scrollTop;case 1:return oObj.getBoundingClientRect().right+oDc.scrollLeft;case 2:return oObj.getBoundingClientRect().bottom+oDc.scrollTop;case 3:return oObj.getBoundingClientRect().left+oDc.scrollLeft;}}else{if(nDire==1||nDire==3){var nPosition=oObj.offsetLeft;}else{var nPosition=oObj.offsetTop;}if(arguments[arguments.length-1]!=0){if(nDire==1){nPosition+=oObj.offsetWidth;}else if(nDire==2){nPosition+=oObj.offsetHeight;}}if(oObj.offsetParent!=null){nPosition+=mSift_SeekTp(oObj.offsetParent,nDire,0);}return nPosition;}}
function mSift(cVarName,nMax){this.oo=cVarName;this.Max=nMax;}
mSift.prototype={
    Varsion:'v2010.10.29 by AngusYoung | mrxcool.com',
    Target:Object,
    TgList:Object,
    Listeners:null,
    SelIndex:0,
    Data:[],
    ReData:[],
    Create:function(oObj){
        var _this=this;
        var oUL=document.createElement('ul');
        oUL.style.display='none';
        oObj.parentNode.insertBefore(oUL,oObj);
        _this.TgList=oUL;
        oObj.onkeydown=oObj.onclick=function(e){_this.Listen(this,e);};
        oObj.onblur=function(){setTimeout(function(){_this.Clear();},100);};
    },
    Complete:function(){},
    Select:function(){
        var _this=this;
        if(_this.ReData.length>0){
            _this.Target.value=_this.ReData[_this.SelIndex].replace(/\*/g,'*').replace(/\|/g,'|');
            _this.Clear();
        }
        setTimeout(function(){_this.Target.focus();},10);
        _this.Complete();
    },
    Listen:function(oObj){
        var _this=this;
        _this.Target=oObj;
        var e=arguments[arguments.length-1];
        var ev=window.event||e;
        switch(ev.keyCode){
            case 9://TAB
                return;
            case 13://ENTER
                _this.Target.blur();
                _this.Select();
                return;
            case 38://UP
                _this.SelIndex=_this.SelIndex>0?_this.SelIndex-1:_this.ReData.length-1;
                break;
            case 40://DOWN
                _this.SelIndex=_this.SelIndex<_this.ReData.length-1?_this.SelIndex+1:0;
                break;
            default:
                _this.SelIndex=0;
        }
        if(_this.Listeners){clearInterval(_this.Listeners);}
        _this.Listeners=setInterval(function(){
            _this.Get();
        },10);
    },
    Get:function(){
        var _this=this;
        if(_this.Target.value==''){_this.Clear();return;}
        if(_this.Listeners){clearInterval(_this.Listeners);};
        _this.ReData=[];
        var cResult='';
        for(var i=0;i<_this.Data.length;i++){
            if(_this.Data[i].toLowerCase().indexOf(_this.Target.value.toLowerCase())>=0){
                _this.ReData.push(_this.Data[i]);
                if(_this.ReData.length==_this.Max){break;}
            }
        }
        var cRegPattern=_this.Target.value.replace(/\*/g,'*');
        cRegPattern=cRegPattern.replace(/\|/g,'|');
        cRegPattern=cRegPattern.replace(/\+/g,'\\+');
        cRegPattern=cRegPattern.replace(/\./g,'\\.');
        cRegPattern=cRegPattern.replace(/\?/g,'\\?');
        cRegPattern=cRegPattern.replace(/\^/g,'\\^');
        cRegPattern=cRegPattern.replace(/\$/g,'\\$');
        cRegPattern=cRegPattern.replace(/\(/g,'\\(');
        cRegPattern=cRegPattern.replace(/\)/g,'\\)');
        cRegPattern=cRegPattern.replace(/\[/g,'\\[');
        cRegPattern=cRegPattern.replace(/\]/g,'\\]');
        cRegPattern=cRegPattern.replace(/\\/g,'\\\\');
        var cRegEx=new RegExp(cRegPattern,'i');
        for(var i=0;i<_this.ReData.length;i++){
            if(_this.Target.value.indexOf('*')>=0){
                _this.ReData[i]=_this.ReData[i].replace(/\*/g,'*');
            }
            if(_this.Target.value.indexOf('|')>=0){
                _this.ReData[i]=_this.ReData[i].replace(/\|/g,'|');
            }
            cResult+='<li style="padding:0 5px;line-height:20px;cursor:default;" onmouseover="'+
                _this.oo+'.ChangeOn(this);'+_this.oo+'.SelIndex='+i+';" onmousedown="'+_this.oo+'.Select();">'
                +_this.ReData[i].replace(cRegEx,function(s){return '<span style="background:#ff9;font-weight:bold;font-style:normal;color:#e60;">'+s+'</span>';});+'</li>';
        }
        if(cResult==''){_this.Clear();}
        else{
            _this.TgList.innerHTML=cResult;
            _this.TgList.style.cssText='display:block;position:absolute;background:#fff;border:#090 solid 1px;margin:-1px 0 0;padding: 5px;list-style:none;font-size:12px;';
            _this.TgList.style.top=mSift_SeekTp(_this.Target,2)+'px';
            _this.TgList.style.left=mSift_SeekTp(_this.Target,3)+'px';
            _this.TgList.style.width=_this.Target.offsetWidth-12+'px';
        }
        var oLi=_this.TgList.getElementsByTagName('li');
        if(oLi.length>0){
            oLi[_this.SelIndex].style.cssText='background:#36c;padding:0 5px;line-height:20px;cursor:default;color:#fff;';
        }
    },
    ChangeOn:function(oObj){
        var oLi=this.TgList.getElementsByTagName('li');
        for(var i=0;i<oLi.length;i++) {
            oLi[i].style.cssText='padding:0 5px;line-height:20px;cursor:default;';
        }
        oObj.style.cssText='background:#36c;padding:0 5px;line-height:20px;cursor:default;color:#fff;';
    },
    Clear:function(){
        var _this=this;
        if(_this.TgList){
            _this.TgList.style.display='none';
            _this.ReData=[];
            _this.SelIndex=0;
        }
    }


}

