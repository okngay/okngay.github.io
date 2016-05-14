function LunarDate(n,t,e,r,a){this.day=n,this.month=t,this.year=e,this.leap=r,this.jd=a}function INT(n){return Math.floor(n)}function jdn(n,t,e){var r=INT((14-t)/12),a=e+4800-r,o=t+12*r-3,i=n+INT((153*o+2)/5)+365*a+INT(a/4)-INT(a/100)+INT(a/400)-32045;return i}function jdn2date(n){var t,e,r,a,o,i,u,l,h,c;return t=n,2299161>t?e=t:(r=INT((t-1867216.25)/36524.25),e=t+1+r-INT(r/4)),a=e+1524,o=INT((a-122.1)/365.25),i=INT(365.25*o),u=INT((a-i)/30.6001),l=INT(a-i-INT(30.6001*u)),h=14>u?u-1:u-13,c=3>h?o-4715:o-4716,new Array(l,h,c)}function decodeLunarYear(n,t){var e,r,a,o,u,l,h,c,g,d=new Array;for(e=new Array(29,30),r=new Array(12),a=t>>17,o=15&t,u=e[t>>16&1],l=jdn(1,1,n),h=l+a,c=t>>4,i=0;i<12;i++)r[12-i-1]=e[1&c],c>>=1;if(0==o)for(g=1;12>=g;g++)d.push(new LunarDate(1,g,n,0,h)),h+=r[g-1];else{for(g=1;o>=g;g++)d.push(new LunarDate(1,g,n,0,h)),h+=r[g-1];for(d.push(new LunarDate(1,o,n,1,h)),h+=u,g=o+1;12>=g;g++)d.push(new LunarDate(1,g,n,0,h)),h+=r[g-1]}return d}function getYearInfo(n){var t;return t=1900>n?TK19[n-1800]:2e3>n?TK20[n-1900]:2100>n?TK21[n-2e3]:TK22[n-2100],decodeLunarYear(n,t)}function findLunarDate(n,t){if(n>LAST_DAY||FIRST_DAY>n||t[0].jd>n)return new LunarDate(0,0,0,0,n);for(var e=t.length-1;n<t[e].jd;)e--;var r=n-t[e].jd;return ret=new LunarDate(t[e].day+r,t[e].month,t[e].year,t[e].leap,n),ret}function getLunarDate(n,t,e){var r,a;return r=getYearInfo(e),a=jdn(n,t,e),a<r[0].jd&&(r=getYearInfo(e-1)),findLunarDate(a,r)}function SunLongitude(n){var t,e,r,a,o,i,u,l,h;return t=(n-2451545)/36525,e=t*t,r=PI/180,a=357.5291+35999.0503*t-1559e-7*e-4.8e-7*t*e,o=280.46645+36000.76983*t+3032e-7*e,i=(1.9146-.004817*t-14e-6*e)*Math.sin(r*a),i=i+(.019993-101e-6*t)*Math.sin(2*r*a)+29e-5*Math.sin(3*r*a),l=o+i,h=125.04-1934.136*t,u=l-.00569-.00478*Math.sin(h*r),u*=r,u-=2*PI*INT(u/(2*PI))}function getSunLongitude(n,t){return INT(SunLongitude(n-.5-t/24)/PI*12)}function parseQuery(n){var t=new Array;if(n.length<2)return t;var e,r,a=n.substring(1,n.length),o=a.split("&");for(e=0;e<o.length;e++){var i=o[e].split("=");for(r=0;r<i.length;r++)t.push(i[r])}return t}function getSelectedMonth(){var n,t=window.location.search,e=parseQuery(t);for(n=0;n<e.length;n++)"mm"==e[n]?currentMonth=parseInt(e[n+1]):"yy"==e[n]&&(currentYear=parseInt(e[n+1]))}function getMonth(n,t){var e,r,a,o,i,u,l,h,c;if(12>n?(u=n+1,l=t):(u=1,l=t+1),o=jdn(1,n,t),i=jdn(1,u,l),e=getYearInfo(t),a=e[0].jd,h=new Array,o>=a)for(c=o;i>c;c++)h.push(findLunarDate(c,e));else if(a>o&&a>i)for(e=getYearInfo(t-1),c=o;i>c;c++)h.push(findLunarDate(c,e));else if(a>o&&i>=a){for(r=getYearInfo(t-1),c=o;a>c;c++)h.push(findLunarDate(c,r));for(c=a;i>c;c++)h.push(findLunarDate(c,e))}return h}function getDayName(n){if(0==n.day)return"";var t=getCanChi(n),e="Ngày "+t[0]+", tháng "+t[1]+", năm "+t[2];return e}function getYearCanChi(n){return CAN[(n+6)%10]+" "+CHI[(n+8)%12]}function getCanHour0(n){return CAN[2*(n-1)%10]}function getCanChi(n){var t,e,r;return t=CAN[(n.jd+9)%10]+" "+CHI[(n.jd+1)%12],e=CAN[(12*n.year+n.month+3)%10]+" "+CHI[(n.month+1)%12],1==n.leap&&(e+=" (nhuận)"),r=getYearCanChi(n.year),new Array(t,e,r)}function getDayString(n,t,e,r){var a,o=TUAN[(n.jd+1)%7];return a=o+" "+t+"/"+e+"/"+r,a+=" -+- ",a=a+"Ngày "+n.day+" tháng "+n.month,1==n.leap&&(a+=" nhuận"),a}function getTodayString(){var n=getDayString(currentLunarDate,today.getDate(),today.getMonth()+1,today.getFullYear());return n+=" năm "+getYearCanChi(currentLunarDate.year)}function getCurrentTime(){today=new Date;var n=today.getHours(),t=today.getMinutes(),e=(today.getSeconds(),10>n?"0"+n:n),r=10>t?"0"+t:t;return e+":"+r}function getGioHoangDao(n){for(var t=(n+1)%12,e=GIO_HD[t%6],r="",a=0,o=0;12>o;o++)"1"==e.charAt(o)&&(r+=CHI[o],r+=" ("+(2*o+23)%24+"-"+(2*o+1)%24+")",a++<5&&(r+=", "),3==a&&(r+="\n"));return r}function OutputOptions(){this.fontSize="13pt",this.tableWidth="420px"}function setOutputSize(n){var t=1;t="small"==n?0:"big"==n?2:1,PRINT_OPTS.fontSize=FONT_SIZES[t],PRINT_OPTS.tableWidth=TAB_WIDTHS[t]}function printSelectedMonth(){return getSelectedMonth(),printMonth(currentMonth,currentYear)}function printMonth(n,t){var e="";return e+=printStyle(),e+=printTable(n,t),e+=printFoot()}function printYear(n){var t="N&#x103;m "+getYearCanChi(n)+" "+n,e="";e+=printStyle(),e+="<table align=center>\n",e+='<tr><td colspan="3" class="tennam" onClick="showYearSelect();">'+t+"</td></tr>\n";for(var r=1;12>=r;r++)r%3==1&&(e+="<tr>\n"),e+="<td>\n",e+=printTable(r,n),e+="</td>\n",r%3==0&&(e+="</tr>\n");return e+="<table>\n",e+=printFoot()}function printSelectedYear(){return getSelectedMonth(),printYear(currentYear)}function printStyle(){var n=PRINT_OPTS.fontSize,t="";return t+='<style type="text/css">\n',t+="<!--\n",t+="  .tennam {text-align:center; font-size:150%; line-height:120%; font-weight:bold; color:#000000; background-color: #CCCCCC}\n",t+="  .thang {font-size: "+n+"; padding:1; line-height:100%; font-family:Tahoma,Verdana,Arial; table-layout:fixed}\n",t+="  .tenthang {text-align:center; font-size:125%; line-height:100%; font-weight:bold; color:#330033; background-color: #CCFFCC}\n",t+="  .navi-l {text-align:center; font-size:75%; line-height:100%; font-family:Verdana,Times New Roman,Arial; font-weight:bold; color:red; background-color: #CCFFCC}\n",t+="  .navi-r {text-align:center; font-size:75%; line-height:100%; font-family:Verdana,Arial,Times New Roman; font-weight:bold; color:#330033; background-color: #CCFFCC}\n",t+="  .ngaytuan {width:14%; text-align:center; font-size:125%; line-height:100%; color:#330033; background-color: #FFFFCC}\n",t+="  .ngaythang {background-color:#FDFDF0}\n",t+="  .homnay {background-color:#FFF000}\n",t+="  .tet {background-color:#FFCC99}\n",t+="  .am {text-align:right;font-size:75%;line-height:100%;color:blue}\n",t+="  .am2 {text-align:right;font-size:75%;line-height:100%;color:#004080}\n",t+="  .t2t6 {text-align:left;font-size:125%;color:black}\n",t+="  .t7 {text-align:left;font-size:125%;line-height:100%;color:green}\n",t+="  .cn {text-align:left;font-size:125%;line-height:100%;color:red}\n",t+="-->\n",t+="</style>\n"}function printTable(n,t){var e,r,a,o,i=getMonth(n,t);if(0!=i.length){var u=i[0],l=(u.jd+1)%7,h=(getYearCanChi(u.year),"");for(h+='<table class="thang highlight centered" border="2" cellpadding="1" cellspacing="1" width="'+PRINT_OPTS.tableWidth+'">\n',h+=printHead(n,t),e=0;6>e;e++){for(h+="<tr>\n",r=0;7>r;r++)a=7*e+r,l>a||a>=l+i.length?h+=printEmptyCell():(o=a-l+1,u=i[a-l],h+=printCell(u,o,n,t));h+="</tr>\n"}return h+="</table>\n"}}function getPrevMonthLink(n,t){var e=n>1?n-1:12,r=n>1?t:t-1;return'<a href="'+window.location.pathname+"?yy="+r+"&mm="+e+'">[Tháng trước]</a>'}function getNextMonthLink(n,t){var e=12>n?n+1:1,r=12>n?t:t+1;return'<a href="'+window.location.pathname+"?yy="+r+"&mm="+e+'"> [Tháng sau]</a>'}function getPrevYearLink(n,t){return'<a href="'+window.location.pathname+"?yy="+(t-1)+"&mm="+n+'"> [Năm trước] </a>'}function getNextYearLink(n,t){return'<a href="'+window.location.pathname+"?yy="+(t+1)+"&mm="+n+'"> [Năm sau]</a>'}function printHead(n,t){var e="",r=n+"/"+t;e+='<tr><td colspan="2" class="navi-l">'+getPrevYearLink(n,t)+" &nbsp;"+getPrevMonthLink(n,t)+"</td>\n",e+='<td colspan="3" class="tenthang" onClick="showMonthSelect();">'+r+"</td>\n",e+='<td colspan="2" class="navi-r">'+getNextMonthLink(n,t)+" &nbsp;"+getNextYearLink(n,t)+"</td></tr>\n",e+='<tr onClick="alertAbout();">\n';for(var a=0;6>=a;a++)e+="<td class=ngaytuan>"+DAYNAMES[a]+"</td>\n";return e+="</tr>\n"}function printEmptyCell(){return"<td class=ngaythang><div class=cn>&nbsp;</div> <div class=am>&nbsp;</div></td>\n"}function printCell(n,t,e,r){var a,o,i,u;a="ngaythang",o="t2t6",i="am",u="black";var l=(n.jd+1)%7;0==l?(o="cn",u="red"):6==l&&(o="t7",u="green"),t==today.getDate()&&e==today.getMonth()+1&&r==today.getFullYear()&&(a="homnay"),1==n.day&&1==n.month&&(a="tet"),1==n.leap&&(i="am2");var h=n.day;(1==t||1==h)&&(h=n.day+"/"+n.month);var c="",g=n.day+","+n.month+","+n.year+","+n.leap;return g+=","+n.jd+","+t+","+e+","+r,c+='<td class="'+a+'"',null!=n&&(c+=' title="'+getDayName(n)+'" onClick="alertDayInfo('+g+');"'),c+=" <div style=color:"+u+' class="'+o+'">'+t+'</div> <div class="'+i+'">'+h+"</div></td>\n"}function printFoot(){var n="";return n+='<script language="JavaScript" src="amlich-hnd.js"></script>\n'}function showMonthSelect(){window.location.replace(window.location.pathname+"?yy="+today.getFullYear()+"&mm="+(today.getMonth()+1),"win2702","menubar=yes,scrollbars=yes,status=yes,toolbar=yes,resizable=yes,location=yes")}function showYearSelect(){window.print()}function infoCellSelect(n){}function alertDayInfo(n,t,e,r,a,o,i,u){var l=new LunarDate(n,t,e,r,a),h=getDayString(l,o,i,u);h+=" âm lịch\n",h+=getDayName(l),h+="\nGiờ đầu ngày: "+getCanHour0(a)+" "+CHI[0],h+="\nTiết: "+TIETKHI[getSunLongitude(a+1,7)],h+="\nGiờ hoàng đạo: "+getGioHoangDao(a),alert(h)}function alertAbout(){}function showVietCal(){window.status=getCurrentTime()+" -+- "+getTodayString(),window.window.setTimeout("showVietCal()",5e3)}var TK19=new Array(3193507,5679952,4336544,2927457,5415792,3953128,6345056,4908208,3631398,5823136,4479824,3217106,5647072,4104928,2679506,5163344,3724630,6075680,4634256,3300772,5789136,4335056,2926003,5415600,4040887,6334800,4895904,3519141,5942608,4478384,3156852,5645680,4215545,6574768,5138768,3698006,6183584,4631376,3299028,5786336,4367728,2966867,5296800,3926183,6346064,4872864,3452325,5936592,4606688,3058356,5547216,4117176,6599312,5027152,3692375,6172064,4756944,3296629,5786032,4367536,2991283,5270160,3845528,6318928,4991840,3511141,5935984,4606320,3172708,5432480,3992170,6478480,5135056,3746518,6171360,4756192,3328725,5687632,4248736,2872483,5289616,3823527,6313392,4990416,3577269,5935792,4499792,3070292,5551264,3978576,2648914,5133744,3811190,6169968,4739760,3320485,5695824,4221600,2800291,5286736),TK20=new Array(3951576,6441696,5023088,3691733,6083168,4512080,3233108,5658272,4233936,2774482,5262048,3843510,6333648,4772432,3396181,5813568,4380320,2928034,5412272,4147575,6572400,5022896,3585205,6056528,4615504,3222356,5647200,4232560,2904818,5261680,3827046,6214816,4778576,3369621,5790416,4467552,3114723,5411552,4049111,6474064,5035168,3528870,5944656,4609696,3253684,5645776,4231888,2806450,5286224,3716439,6188192,4765008,3494741,5787040,4367792,3097971,5526192,3975592,6351184,5008032,3583654,5942096,4606816,3189476,5678448,4215392,2683491,5167424,3726151,6084256,4757200,3427797,5917392,4367568,2938036,5419600,3986776,6337856,4896160,3626406,6067632,4606384,3189108,5678256,4237904,2730578,5139744,3779911,6204256,4756336,3427061,5917040,4482224,2913443,5302864,4024920,6444704,4893392,3577557,6066912),TK21=new Array(4639072,3070292,5559456,4119120,2782546,5133984,3712935,6202832,4887216,3320501,5810512,4371616,2931364,5287248,3954137,6441888,5023152,3625334,6050416,4614448,3176756,5532320,4107600,2775890,5262176,3712742,6202592,4772448,3336805,5690656,4250272,2971299,5396176,3951355,6441424,5022928,3657910,5943888,4502816,3071269,5551520,4085200,2774450,5261744,3843447,6202544,4762192,3387989,5795104,4238688,2968419,5395312,4082152,6343024,5002416,3631270,5954128,4479648,3122852,5548752,4215520,2675427,5163344,3724631,6214816,4643152,3300693,5789344,4368080,2905556,5395120,3975608,6465840,4895888,3454630,5942608,4609440,3058532,5547376,4215472,2797939,5138736,3697463,6187680,4762960,3353301,5778272,4367728,3035876,5296480,3860824,6346016,4905616,3496614,5920464,4598496,3189204,5546704,4116816,2681170),TK22=new Array(5158176,3725095,6204832,4871600,3550645,5916080,4498096,3060404,5548368,3978585,6449952,5025104,3692390,6050672,4736368,3302772,5788336,4221264,2783571,5266080,3910311,6203088,4868832,3515109,5940560,4379296,3007140,5428560,4086459,6444704,5019344,3754422,6179504,4630736,3200181,5681808,4240720,2780498,5262752,3904871,6329712,4868528,3451253,5924016,4483728,2931348,5401424,4074336,2665313,5018992,3689190,6082912,4646048,3075365,5560976,4217680,2897619,5253856,3838935,6329040,4901200,3331414,5813408,4372112,3038612,5395888,4072954,6563248,5149360,3582646,6056272,4617376,3256997,5549392,4216224,2796403,5383536,3822455,6312624,4876624,3435862,5790368,4369232,3036884,5524192,3974512,2647250,5034592,3599014,5952848,4610720,3190181,5674448,4213456,2795955,5285072,3855031,6206032,4764992,3396950),CAN=new Array("Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"),CHI=new Array("Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"),TUAN=new Array("Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"),GIO_HD=new Array("110100101100","001101001011","110011010010","101100110100","001011001101","010010110011"),TIETKHI=new Array("Xuân phân","Thanh minh","Cốc vũ","Lập hạ","Tiểu mãn","Mang chủng","Hạ chí","Tiểu thử","Đại thử","Lập thu","Xử thử","Bạch lộ","Thu phân","Hàn lộ","Sương giáng","Lập đông","Tiểu tuyết","Đại tuyết","Đông chí","Tiểu hàn","Đại hàn","Lập xuân","Vũ Thủy","Kinh trập"),PI=Math.PI,FIRST_DAY=jdn(25,1,1800),LAST_DAY=jdn(31,12,2199),today=new Date,currentLunarDate=getLunarDate(today.getDate(),today.getMonth()+1,today.getFullYear()),currentMonth=today.getMonth()+1,currentYear=today.getFullYear(),DAYNAMES=new Array("CN","T2","T3","T4","T5","T6","T7"),PRINT_OPTS=new OutputOptions,FONT_SIZES=new Array("9pt","13pt","17pt"),TAB_WIDTHS=new Array("180px","420px","600px");
