// 宽高可以自适应
oW = window.document.documentElement.getBoundingClientRect().width - 60;
oH = 400;
M = Math;
Cos = M.cos;
Sin = M.sin;
PI = M.PI;
tPI = 2*M.PI;
oC = document.getElementById("oC");
oC.width = oW;
oC.height = oH;
ctx = oC.getContext("2d");

cradius = 15 // 圆角半径
w = [];      // 圆运动圆角矩形轨迹

gap = 10;

fx = gap;
fy = 10;

fx2 = gap + 10;
fy2 = 20;

bw = (oW - 2*gap);
bh = (oH + gap) * 0.875;

sw = bw - 20;
sh = bh - 20;

function getTrail () {
    var sx = fx + 15, sy = fy + 5, w = bw - 10, h = bh - 10, result = [],
        section = 2, // 轨迹点间隔区间
        csection = 0.1, // 圆轨迹区间
        ccp = [0,0]          // 圆角圆心点
    coffset = -(PI/2);   // 圆轨迹起始位置

    // 上边
    for (var i = sx; i<=w; i+=section) {
        result.push([i, sy]);
    }
    sx = i;
    ccp = [sx , sy + cradius];
    // 右上圆角
    for (var i = coffset; i <= coffset + tPI/4; i+=csection) {
        result.push([ccp[0] + cradius*Cos(i), ccp[1] + cradius*Sin(i)]);
    }
    sx = ccp[0] + cradius*Cos(i);
    sy = ccp[1] + cradius*Sin(i);
    // 右边
    for (var i = sy; i<=h; i+=section) {
        result.push([sx, i]);
    }
    sy = i;
    ccp = [sx - cradius, sy]
    // 右下圆角
    for (var i = coffset + tPI/4; i < coffset + tPI/2 ; i+=csection) {
        result.push([ccp[0] + cradius*Cos(i), ccp[1] + cradius*Sin(i)]);
    }
    sx = ccp[0] + cradius*Cos(i);
    sy = ccp[1] + cradius*Sin(i);

    // 下边
    for (var i = sx; i >= 30; i -= section ) {
        result.push([i,sy]);
    }
    sx = i;
    ccp = [sx, sy - cradius];

    // 左下圆角
    for (var i = coffset + tPI/2; i < coffset + (3*tPI)/4 ; i += csection) {
        result.push([ccp[0] + cradius*Cos(i), ccp[1] + cradius*Sin(i)]);
    }
    sx = ccp[0] + cradius*Cos(i);
    sy = ccp[1] + cradius*Sin(i);

    // 左边
    for (var i = sy; i >= 15 + cradius; i -= section) {
        result.push([sx,i]);
    }

    sy = i;
    ccp = [sx + cradius, sy];
    // 左上角

    for (var i = coffset + (3*tPI)/4; i < coffset + tPI; i+=csection) {
        result.push([ccp[0] + cradius*Cos(i), ccp[1] + cradius*Sin(i)]);
    }

    result.push([fx + 15,fy + 5]);

    return result;
}


// 绘制圆角矩形
function drawRoundedRect(x,y,w,h,r,bdWidth=3,bdColor,bgcolor){
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.lineWidth = bdWidth;
    ctx.strokeStyle = bdColor;
    ctx.arcTo(x+w,y,x+w,y+h,r);
    ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r);
    ctx.arcTo(x,y,x+w,y,r);
    ctx.stroke();
    if(bgcolor) {
        ctx.fillStyle = bgcolor;
        ctx.fill()
    };
    ctx.closePath();
}

// 绘制圆
function drawCircle (x,y,bg="rgba(238,232,255,1)" , isshadow) {
    var r = (bw/2 - sw/2)/2;

    ctx.beginPath();

    if (isshadow) {
        ctx.save();
        ctx.shadowColor  = "rgba(255, 255, 255, 1)";
        ctx.shadowOffsetX = 0; // 阴影Y轴偏移
        ctx.shadowOffsetY = 1; // 阴影X轴偏移
        ctx.shadowBlur = 5; // 模糊尺寸
    } else {
        ctx.save();
        ctx.shadowColor  = "transparent";
    }
    ctx.fillStyle = bg;
    ctx.arc(x,y,r,0,tPI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

w = getTrail();
re = 16 // 区间位置点

// 用于表示运动的位置
nowkey = 0;
cflag = 1; // 灯光顺序改变

render();

function drawCricleGroup (v) {
    var t = v,k = 0,m = 0; // m 控制绘制灯的个数

    // 当 k 差不多累计一圈轨迹之后，停止循环
    while (k + re <= w.length - 1) {
        var tmp = w[t];
        m++;
        if(cflag) {
            if(m % 2 === 0) {
                drawCircle(tmp[0], tmp[1], "rgba(255,255,255,"+ 1 +")",1);
            } else {
                drawCircle(tmp[0], tmp[1], "rgba(255,255,255,"+ 0.2 +")",0);
            }
        } else {
            if(m % 2 === 0) {
                drawCircle(tmp[0], tmp[1], "rgba(255,255,255,"+ 0.2 +")",0);
            } else {
                drawCircle(tmp[0], tmp[1], "rgba(255,255,255,"+ 1 +")",1);
            }
        }
        if ((t + re) > w.length - 1) {
            t = t + re - w.length;
        } else {
            t += re;
        }
        k += re;
    }
}

function render() {
    ctx.clearRect(0,0,oW,oH)
    ctx.save();
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 3;
    ctx.shadowColor = "rgba(255,255,255,1)"
    drawRoundedRect(fx,fy,bw,bh,cradius,3,"#AF8DFB","#AF8DFB");
    drawRoundedRect(fx2,fy2,sw,sh,cradius,3,"transparent","#644AE1");
    ctx.restore();

    if(nowkey >= w.length - 1) {
        nowkey = 0;
    } else {
        nowkey++;
    }

    drawCricleGroup(nowkey);

    if(nowkey % re === 0) {
        cflag ^= 1;
    }

    requestAnimationFrame(render)
}